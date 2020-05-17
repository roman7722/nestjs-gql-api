import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import Bonus from './bonus.model';
import { BonusCreateInputDto } from './dto/input/bonus-create.input.dto';
import { BonusDeleteInputDto } from './dto/input/bonus-delete.input.dto';
import { BonusUpdateInputDto } from './dto/input/bonus-update.input.dto';

@Injectable()
export class BonusService {
  constructor(
    @Inject('BONUS_REPOSITORY') private readonly BONUS_REPOSITORY: typeof Bonus,
  ) {}

  public async checkVersion(id: number): Promise<Bonus | undefined> {
    try {
      return await this.BONUS_REPOSITORY.findOne<Bonus>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async bonus(id: number): Promise<Bonus> {
    try {
      return await this.BONUS_REPOSITORY.findOne<Bonus | undefined>({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async bonusList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<Bonus[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.BONUS_REPOSITORY.findAll<Bonus>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          bonusName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['bonusName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async bonusNameFind(bonusName: string): Promise<Bonus> {
    try {
      return await this.BONUS_REPOSITORY.findOne<Bonus | undefined>({
        where: { bonusName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'bonusNameFind',
    'bonusName',
    'bonus:validate:notUniqueBonusName',
  )
  async bonusCreate(data: BonusCreateInputDto): Promise<Bonus> {
    try {
      return await this.BONUS_REPOSITORY.create<Bonus>(data);
    } catch (error) {
      if (error.messageCode === 'bonus:validate:notUniqueBonusName') {
        throw new MessageCodeError('bonus:validate:notUniqueBonusName');
      }
      throw new MessageCodeError('bonus:create:unableToCreateBonus');
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'bonusNameFind',
    'bonusName',
    'bonus:validate:notUniqueBonusName',
  )
  async bonusUpdate(data: BonusUpdateInputDto): Promise<Bonus> {
    try {
      const res = await this.BONUS_REPOSITORY.update<Bonus>(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      if (error.messageCode === 'bonus:validate:notUniqueBonusName') {
        throw new MessageCodeError('bonus:validate:notUniqueBonusName');
      }
      throw new MessageCodeError('bonus:update:unableToUpdateBonus');
    }
  }

  @OptimisticLocking(false)
  async bonusDelete(data: BonusDeleteInputDto): Promise<Number> {
    try {
      return await this.BONUS_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
