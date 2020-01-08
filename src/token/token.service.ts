import { Op, Transaction } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateRefreshTokenInput } from './inputs/token.create.inputs';
import { UpdateRefreshTokenInput } from './inputs/token.update.inputs';
import Token from './token.model';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private readonly TOKEN_REPOSITORY: typeof Token,
  ) {}

  async createRefreshToken(data: CreateRefreshTokenInput): Promise<Token> {
    try {
      return await this.TOKEN_REPOSITORY.create<Token>(data);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateRefreshToken(values: UpdateRefreshTokenInput): Promise<number> {
    try {
      const res = await this.TOKEN_REPOSITORY.update<Token>(values, {
        where: { id: values.id },
        returning: true,
      });
      const [, [data]] = res;
      return data.getDataValue('id');
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findRefreshToken(userId: number, fingerprint: string): Promise<Token> {
    try {
      return await this.TOKEN_REPOSITORY.findOne<Token>({
        where: {
          [Op.and]: [{ userId }, { fingerprint }],
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async verifyRefreshToken(
    refreshToken: string,
    fingerprint: string,
  ): Promise<Token | undefined> {
    return await this.TOKEN_REPOSITORY.findOne<Token>({
      where: {
        [Op.and]: [{ refreshToken }, { fingerprint }],
      },
    });
  }

  async deleteRefreshToken(recordId: number): Promise<number> {
    return await this.TOKEN_REPOSITORY.destroy({
      where: {
        id: recordId,
      },
    });
  }

  async deleteAllRefreshToken(
    userId: number,
    transaction?: Transaction,
  ): Promise<number> {
    return await this.TOKEN_REPOSITORY.destroy({
      where: {
        userId,
      },
      transaction,
    });
  }

  async numberRefreshTokens(userId: number): Promise<number> {
    return await this.TOKEN_REPOSITORY.count({
      where: {
        userId,
      },
    });
  }
}
