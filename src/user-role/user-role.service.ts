import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRoleCreateInput } from './input/user-role-create.input';
import UserRole from './user-role.model';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject('USER_ROLE_REPOSITORY')
    private readonly USER_ROLE_REPOSITORY: typeof UserRole,
  ) {}

  async userRole(id: string): Promise<UserRole | undefined> {
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

  async userRoleUpdate({ id, roleDescription }): Promise<string> {
    try {
      const res = await this.USER_ROLE_REPOSITORY.update<UserRole>(
        {
          roleDescription,
        },
        {
          where: {
            id,
          },
          returning: true,
        },
      );
      const [, [data]] = res;
      return data.getDataValue('id');
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
