import * as bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';
import { DatabaseError, Op, Transaction, ValidationError } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { MessageCodeError } from '../common/lib/error/MessageCodeError';
import { TokenService } from '../token/token.service';
import UserRole from '../user-role/user-role.model';
import { UserArgs } from './args/user.args';
import { CreateUserInput } from './inputs/user.create.input';
import { UpdateUserInput } from './inputs/user.update.input';
import User from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('SEQUELIZE') private readonly SEQUELIZE,
    @Inject('USER_REPOSITORY') private readonly USER_REPOSITORY: typeof User,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * User search for auth module
   * @param username {string}
   * @returns {User | undefined}
   */
  async findUser(username: string): Promise<User | undefined> {
    try {
      const res = await this.USER_REPOSITORY.findOne<any>({
        where: { username },
        attributes: ['id', 'username', 'passwordHash'],
      });
      return res;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async userList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<User[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.USER_REPOSITORY.findAll<any>({
        limit: paging,
        offset: (page - 1) * paging,
        include: [UserRole],
        where: {
          displayName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['displayName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async user(id: number): Promise<User | undefined> {
    try {
      return await this.USER_REPOSITORY.findOne<any>({
        include: [UserRole],
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async usersFiltered(data: UserArgs): Promise<User[]> {
    try {
      const loginWhereCondition = {};
      if (data.usernames.length > 0) {
        loginWhereCondition[Op.or] = data.usernames.map((username: string) => {
          return {
            username,
          };
        });
      }

      const idWhereCondition = {};
      if (data.ids.length > 0) {
        idWhereCondition[Op.or] = data.ids.map((id: number) => {
          return {
            id,
          };
        });
      }

      return await this.USER_REPOSITORY.findAll<any>({
        include: [UserRole],
        where: {
          [Op.or]: [idWhereCondition, loginWhereCondition],
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  static async hashPassword(password: string, rounds: number): Promise<string> {
    return await bcrypt.hash(password, rounds);
  }

  async createUser(data: CreateUserInput): Promise<any> {
    try {
      const hash: string = await UserService.hashPassword(
        data.passwordHash,
        12,
      );
      return await this.USER_REPOSITORY.create<User>({
        ...data,
        displayName:
          data.secondName + ' ' + data.firstName + ' ' + data.middleName,
        passwordHash: hash,
      });
    } catch (err) {
      throw new MessageCodeError('user:create:unableToCreateUser');
    }
  }

  async updateUser(val: UpdateUserInput): Promise<any> {
    try {
      const hash: string = await UserService.hashPassword(val.passwordHash, 12);
      const res = await this.USER_REPOSITORY.update<User>(
        {
          ...val,
          displayName:
            val.secondName + ' ' + val.firstName + ' ' + val.middleName,
          passwordHash: hash,
        },
        {
          where: { id: val.id },
          returning: true,
          individualHooks: true,
        },
      );
      const [, [data]] = res;
      return data.getDataValue('id');
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteUser(userId: number): Promise<any> {
    let transaction: Transaction;

    try {
      transaction = await this.SEQUELIZE.transaction();
      await this.tokenService.deleteAllRefreshToken(userId, transaction);
      const result = await this.USER_REPOSITORY.destroy({
        where: {
          id: userId,
        },
        transaction,
      });
      transaction.commit();

      return result;
    } catch (error) {
      transaction.rollback();
      throw new Error(error);
    }
  }
}
