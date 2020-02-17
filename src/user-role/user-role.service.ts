import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OptimisticLocking } from '../common/decorators';
import { UserRoleCreateInput } from './input/user-role-create.input';
import { UserRoleDeleteInput } from './input/user-role-delete.input';
import { UserRoleUpdateInput } from './input/user-role-update.input';
import UserRole from './user-role.model';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject('USER_ROLE_REPOSITORY')
    private readonly USER_ROLE_REPOSITORY: typeof UserRole,
  ) {}

  public async checkVersion(id: string): Promise<UserRole | undefined> {
    try {
      return await this.USER_ROLE_REPOSITORY.findOne<UserRole>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  public async userRole(id: string): Promise<UserRole | undefined> {
    try {
      return await this.USER_ROLE_REPOSITORY.findOne<UserRole>({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async userRolesFind(ids: number[]): Promise<UserRole[]> {
    try {
      const whereCondition = {};
      if (ids.length > 0) {
        whereCondition[Op.or] = ids.map((id: number) => {
          return {
            id,
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

  async userRoleCreate(data: UserRoleCreateInput): Promise<UserRole> {
    try {
      return await this.USER_ROLE_REPOSITORY.create<UserRole>(data);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @OptimisticLocking(true)
  async userRoleUpdate(data: UserRoleUpdateInput): Promise<UserRole> {
    try {
      const res = await this.USER_ROLE_REPOSITORY.update<UserRole>(data, {
        where: { id: data.id },
        returning: true,
      });

      const [, [val]] = res;

      return val;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @OptimisticLocking(false)
  async userRoleDelete(data: UserRoleDeleteInput): Promise<Number> {
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
