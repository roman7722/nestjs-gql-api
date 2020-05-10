import * as bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';
import { Op, Transaction } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import { SessionService } from '../session/session.service';
import UserRole from '../user-role/user-role.model';
import { UserFindArgs } from './args/user-find.args';
import { UserCreateInput } from './input/user-create.input';
import { UserDeleteInput } from './input/user-delete.input';
import { UserUpdateInput } from './input/user-update.input';
import User from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('SEQUELIZE') private readonly SEQUELIZE,
    @Inject('USER_REPOSITORY') private readonly USER_REPOSITORY: typeof User,
    private readonly sessionService: SessionService,
  ) {}

  /**
   * Поиск пользователя по имени для модуля аутентификации
   * @param username {string}
   * @returns {User | undefined}
   */
  async userFind(username: string): Promise<User | undefined> {
    try {
      const res = await this.USER_REPOSITORY.findOne<User>({
        where: { username },
        attributes: ['id', 'roleId', 'username', 'passwordHash'],
      });
      return res;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /**
   * Поиск роли пользователя по id для модуля RolesGuard
   * @param id {number}
   * @returns {User | undefined}
   */
  async userRoleFind(id: number): Promise<User | undefined> {
    try {
      const res = await this.USER_REPOSITORY.findOne<User>({
        where: { id },
        attributes: ['roleId'],
      });
      return res;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /**
   * Поиск version записи по id для @OptimisticLocking
   * @param id {number}
   * @returns {User | undefined}
   */
  public async checkVersion(id: number): Promise<User | undefined> {
    try {
      return await this.USER_REPOSITORY.findOne<User>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async userNameFind(username: string): Promise<User | undefined> {
    try {
      const res = await this.USER_REPOSITORY.findOne<User>({
        where: { username },
        attributes: ['id', 'username'],
      });
      return res;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async user(id: number): Promise<User | undefined> {
    try {
      return await this.USER_REPOSITORY.findOne<User>({
        include: [UserRole],
        where: { id },
      });
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
      return await this.USER_REPOSITORY.findAll<User>({
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

  async usersFind(data: UserFindArgs): Promise<User[]> {
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

      return await this.USER_REPOSITORY.findAll<User>({
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

  @CheckIsValueUnique(
    'userNameFind',
    'username',
    'user:validate:notUniqueUserName',
  )
  async userCreate(data: UserCreateInput): Promise<User> {
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
    } catch (error) {
      if (error.messageCode === 'user:validate:notUniqueUserName') {
        throw new MessageCodeError('user:validate:notUniqueUserName');
      }
      throw new MessageCodeError('user:create:unableToCreateUser');
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'userNameFind',
    'username',
    'user:validate:notUniqueUserName',
  )
  async userUpdate(data: UserUpdateInput): Promise<User> {
    try {
      const hash: string = await UserService.hashPassword(
        data.passwordHash,
        12,
      );
      const res = await this.USER_REPOSITORY.update<User>(
        {
          ...data,
          displayName:
            data.secondName + ' ' + data.firstName + ' ' + data.middleName,
          passwordHash: hash,
        },
        {
          where: { id: data.id },
          returning: true,
        },
      );

      const [, [val]] = res;

      return val;
    } catch (error) {
      if (error.messageCode === 'user:validate:notUniqueUserName') {
        throw new MessageCodeError('user:validate:notUniqueUserName');
      }
      throw new MessageCodeError('user:update:unableToUpdateUser');
    }
  }

  @OptimisticLocking(false)
  async userDelete(data: UserDeleteInput): Promise<Number> {
    const { id } = data;
    let transaction: Transaction;

    try {
      transaction = await this.SEQUELIZE.transaction();
      await this.sessionService.deleteAllSessions(id, transaction);
      const result = await this.USER_REPOSITORY.destroy({
        where: { id },
        transaction,
      });
      transaction.commit();

      return result;
    } catch (error) {
      transaction.rollback();
      throw new BadRequestException();
    }
  }
}
