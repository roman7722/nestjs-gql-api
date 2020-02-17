import { Op, Transaction } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SessionCreateInput } from './inputs/session-create.input';
import { SessionUpdateInput } from './inputs/session-update.input';
import Session from './session.model';

@Injectable()
export class SessionService {
  constructor(
    @Inject('SESSION_REPOSITORY')
    private readonly SESSION_REPOSITORY: typeof Session,
  ) {}

  async createSession(data: SessionCreateInput): Promise<Session> {
    try {
      return await this.SESSION_REPOSITORY.create<Session>(data);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateSession(values: SessionUpdateInput): Promise<number> {
    try {
      const res = await this.SESSION_REPOSITORY.update<Session>(values, {
        where: { id: values.id },
        returning: true,
      });
      const [, [data]] = res;
      return data.getDataValue('id');
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findSession(userId: number, fingerprint: string): Promise<Session> {
    try {
      return await this.SESSION_REPOSITORY.findOne<Session>({
        where: {
          [Op.and]: [{ userId }, { fingerprint }],
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async verifySession(
    refreshToken: string,
    fingerprint: string,
  ): Promise<Session | undefined> {
    return await this.SESSION_REPOSITORY.findOne<Session>({
      where: {
        [Op.and]: [{ refreshToken }, { fingerprint }],
      },
    });
  }

  async deleteSession(recordId: number): Promise<number> {
    return await this.SESSION_REPOSITORY.destroy({
      where: {
        id: recordId,
      },
    });
  }

  async deleteAllSessions(
    userId: number,
    transaction?: Transaction,
  ): Promise<number> {
    return await this.SESSION_REPOSITORY.destroy({
      where: {
        userId,
      },
      transaction,
    });
  }

  async numberSessions(userId: number): Promise<number> {
    return await this.SESSION_REPOSITORY.count({
      where: {
        userId,
      },
    });
  }
}
