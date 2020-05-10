import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import UserRole from '../user-role/user-role.model';
import User from '../user/user.model';
import Agreement from './agreement.model';
import { AgreementCreateInput } from './input/agreement-create.input';
import { AgreementDeleteInput } from './input/agreement-delete.input';
import { AgreementUpdateInput } from './input/agreement-update.input';

@Injectable()
export class AgreementService {
  constructor(
    @Inject('AGREEMENT_REPOSITORY')
    private readonly AGREEMENT_REPOSITORY: typeof Agreement,
  ) {}

  public async checkVersion(id: number): Promise<Agreement | undefined> {
    try {
      return await this.AGREEMENT_REPOSITORY.findOne<Agreement>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async agreement(id: number): Promise<Agreement> {
    try {
      return await this.AGREEMENT_REPOSITORY.findOne<Agreement | undefined>({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async agreementList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<Agreement[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.AGREEMENT_REPOSITORY.findAll<Agreement>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          agreementNumber: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['agreementNumber', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async agreementNumberFind(agreementNumber: string): Promise<Agreement> {
    try {
      return await this.AGREEMENT_REPOSITORY.findOne<Agreement | undefined>({
        where: { agreementNumber },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async agreementsNumbersFind(agreementNumber: string[]): Promise<Agreement[]> {
    const whereCondition = {};
    if (agreementNumber.length > 0) {
      whereCondition[Op.or] = agreementNumber.map((agreementNumber: string) => {
        return {
          agreementNumber,
        };
      });
    }
    return await this.AGREEMENT_REPOSITORY.findAll<Agreement>({
      include: [{ model: User, include: [{ model: UserRole }] }],
      where: whereCondition,
    });
  }

  @CheckIsValueUnique(
    'agreementNumberFind',
    'agreementNumber',
    'agreement:validate:notUniqueAgreementNumber',
  )
  async agreementCreate(data: AgreementCreateInput): Promise<Agreement> {
    try {
      return await this.AGREEMENT_REPOSITORY.create<Agreement>(data);
    } catch (error) {
      if (error.messageCode === 'agreement:validate:notUniqueAgreementNumber') {
        throw new MessageCodeError(
          'agreement:validate:notUniqueAgreementNumber',
        );
      }
      throw new MessageCodeError('agreement:create:unableToCreateAgreement');
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'agreementNumberFind',
    'agreementNumber',
    'agreement:validate:notUniqueAgreementNumber',
  )
  async agreementUpdate(data: AgreementUpdateInput): Promise<Agreement> {
    try {
      const res = await this.AGREEMENT_REPOSITORY.update<Agreement>(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      if (error.messageCode === 'agreement:validate:notUniqueAgreementNumber') {
        throw new MessageCodeError(
          'agreement:validate:notUniqueAgreementNumber',
        );
      }
      throw new MessageCodeError('agreement:update:unableToUpdateAgreement');
    }
  }

  @OptimisticLocking(false)
  async agreementDelete(data: AgreementDeleteInput): Promise<Number> {
    try {
      return await this.AGREEMENT_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
