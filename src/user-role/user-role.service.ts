import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error';
import { UserRoleCreateInputDto } from './dto/input/user-role-create.input.dto';
import { UserRoleDeleteInputDto } from './dto/input/user-role-delete.input.dto';
import { UserRoleUpdateInputDto } from './dto/input/user-role-update.input.dto';
import UserRole from './user-role.model';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject('USER_ROLE_REPOSITORY')
    private readonly USER_ROLE_REPOSITORY: typeof UserRole,
  ) {}

  public async checkVersion(id: number): Promise<UserRole | undefined> {
    try {
      return await this.USER_ROLE_REPOSITORY.findOne<UserRole>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  public async userRole(id: number): Promise<UserRole | undefined> {
    try {
      return await this.USER_ROLE_REPOSITORY.findOne<UserRole>({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async userRoleList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<UserRole[]> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.USER_ROLE_REPOSITORY.findAll<UserRole>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          userRoleName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['id', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async userRoles(userRoleNames: string[]): Promise<UserRole[]> {
    try {
      const whereCondition = {};
      if (userRoleNames.length > 0) {
        whereCondition[Op.or] = userRoleNames.map((userRoleName: string) => {
          return {
            userRoleName,
          };
        });
      }
      return await this.USER_ROLE_REPOSITORY.findAll<UserRole>({
        where: whereCondition,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async userRoleNameFind(userRoleName: string): Promise<UserRole> {
    try {
      return await this.USER_ROLE_REPOSITORY.findOne<UserRole | undefined>({
        where: { userRoleName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'userRoleNameFind',
    'userRoleName',
    'userRole:validate:notUniqueUserRoleId',
  )
  async userRoleCreate(data: UserRoleCreateInputDto): Promise<UserRole> {
    try {
      return await this.USER_ROLE_REPOSITORY.create<UserRole>(data);
    } catch (error) {
      if (error.messageCode === 'userRole:validate:notUniqueUserRoleId') {
        throw new MessageCodeError('userRole:validate:notUniqueUserRoleId');
      }
      throw new MessageCodeError('userRole:create:unableToCreateUserRole');
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'userRoleNameFind',
    'userRoleName',
    'userRole:validate:notUniqueUserRoleId',
  )
  async userRoleUpdate(data: UserRoleUpdateInputDto): Promise<UserRole> {
    try {
      const res = await this.USER_ROLE_REPOSITORY.update<UserRole>(data, {
        where: { id: data.id },
        returning: true,
      });

      const [, [val]] = res;

      return val;
    } catch (error) {
      if (error.messageCode === 'userRole:validate:notUniqueUserRoleId') {
        throw new MessageCodeError('userRole:validate:notUniqueUserRoleId');
      }
      throw new MessageCodeError('userRole:update:unableToUpdateUserRole');
    }
  }

  @OptimisticLocking(false)
  async userRoleDelete(data: UserRoleDeleteInputDto): Promise<Number> {
    try {
      const { id, version } = data;
      return await this.USER_ROLE_REPOSITORY.destroy({
        where: {
          [Op.and]: [{ id }, { version }],
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
