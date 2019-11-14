import { Op } from 'sequelize';
import { Inject, Injectable } from '@nestjs/common';
import UserRole from '../user-role/user-role.model';
import User from '../user/user.model';
import Agreement from './agreement.model';

@Injectable()
export class AgreementService {
  constructor(
    @Inject('AGREEMENT_REPOSITORY')
    private readonly AGREEMENT_REPOSITORY: typeof Agreement,
  ) {}

  async findAgreements(numAgreements: string[]): Promise<Agreement[]> {
    const whereCondition = {};
    if (numAgreements.length > 0) {
      whereCondition[Op.or] = numAgreements.map((numAgreement: string) => {
        return {
          numAgreement,
        };
      });
    }
    return await this.AGREEMENT_REPOSITORY.findAll<Agreement>({
      include: [{ model: User, include: [{ model: UserRole }] }],
      where: whereCondition,
    });
  }
}
