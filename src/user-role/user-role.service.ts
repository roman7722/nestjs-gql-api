import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OptimisticLocking } from '../optimistic-locking/decorators/optimistic-locking.decorator';
import { UserRoleCreateInput } from './input/user-role-create.input';
import { UserRoleUpdateInput } from './input/user-role-update.input';
import UserRole from './user-role.model';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject('USER_ROLE_REPOSITORY')
    private readonly USER_ROLE_REPOSITORY: typeof UserRole,
  ) {}

  public async getVersion(id: string): Promise<UserRole | undefined> {
    try {
      console.log('getVersion ----> ', this);

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
      console.log('userRole ----> ', this);

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

  @OptimisticLocking('getVersion')
  async userRoleUpdate(val: UserRoleUpdateInput): Promise<UserRole> {
    const { version, id } = val;
    try {
      const res = await this.USER_ROLE_REPOSITORY.update<UserRole>(
        {
          ...val,
          version: version + 1,
        },
        {
          where: {
            [Op.and]: [{ id }, { version }],
          },
          returning: true,
        },
      );

      const [, [data]] = res;

      return data;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async userRoleDelete(id: string): Promise<number> {
    return await this.USER_ROLE_REPOSITORY.destroy({
      where: {
        id,
      },
    });
  }
}
