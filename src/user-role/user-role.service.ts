import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateUserRoleInput } from './inputs/user-role.create.input';
import UserRole from './user-role.model';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject('USER_ROLE_REPOSITORY')
    private readonly USER_ROLE_REPOSITORY: typeof UserRole,
  ) {}

  async readUserRole(id: string): Promise<UserRole | undefined> {
    try {
      return await this.USER_ROLE_REPOSITORY.findOne<any>({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findUserRoles(ids: number[]): Promise<UserRole[]> {
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

  async createUserRole(data: CreateUserRoleInput): Promise<UserRole> {
    try {
      return await this.USER_ROLE_REPOSITORY.create<UserRole>(data);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateUserRole({ id, roleDescription }): Promise<any> {
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

  async deleteUserRole(id: string): Promise<number> {
    return await this.USER_ROLE_REPOSITORY.destroy({
      where: {
        id,
      },
    });
  }
}
