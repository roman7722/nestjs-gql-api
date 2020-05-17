import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import AgreementStatus from '../agreement-status/agreement-status.model';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import Customer from '../customer/customer.model';
import SocialStatus from '../social-status/social-status.model';
import UserRole from '../user-role/user-role.model';
import User from '../user/user.model';
import Ward from '../ward/ward.model';
import Agreement from './agreement.model';
import { AgreementCreateInputDto } from './dto/input/agreement-create.input.dto';
import { AgreementDeleteInputDto } from './dto/input/agreement-delete.input.dto';
import { AgreementUpdateInputDto } from './dto/input/agreement-update.input.dto';

@Injectable()
export class AgreementService {
  constructor(
    @Inject('AGREEMENT_REPOSITORY')
    private readonly AGREEMENT_REPOSITORY: typeof Agreement,
  ) {}

  private readonly includedModels = [User, Customer, Ward, AgreementStatus];

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
        include: [
          ...this.includedModels,
          { model: Ward, include: [{ model: SocialStatus }] },
        ],
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
        include: this.includedModels,
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
  async agreementCreate(data: AgreementCreateInputDto): Promise<Agreement> {
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
  async agreementUpdate(data: AgreementUpdateInputDto): Promise<Agreement> {
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
  async agreementDelete(data: AgreementDeleteInputDto): Promise<Number> {
    try {
      return await this.AGREEMENT_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
