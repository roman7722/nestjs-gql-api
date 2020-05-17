import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import BonusCategory from './bonus-category.model';
import { BonusCategoryCreateInputDto } from './dto/input/bonus-category-create.input.dto';
import { BonusCategoryDeleteInputDto } from './dto/input/bonus-category-delete.input.dto';
import { BonusCategoryUpdateInputDto } from './dto/input/bonus-category-update.input.dto';

@Injectable()
export class BonusCategoryService {
  constructor(
    @Inject('BONUS_CATEGORY_REPOSITORY')
    private readonly BONUS_CATEGORY_REPOSITORY: typeof BonusCategory,
  ) {}

  public async checkVersion(id: number): Promise<BonusCategory | undefined> {
    try {
      return await this.BONUS_CATEGORY_REPOSITORY.findOne<BonusCategory>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async bonusCategory(id: number): Promise<BonusCategory> {
    try {
      return await this.BONUS_CATEGORY_REPOSITORY.findOne<
        BonusCategory | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async bonusCategoryList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<BonusCategory[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.BONUS_CATEGORY_REPOSITORY.findAll<BonusCategory>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          bonusCategoryName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['bonusCategoryName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async bonusCategoryNameFind(
    bonusCategoryName: string,
  ): Promise<BonusCategory> {
    try {
      return await this.BONUS_CATEGORY_REPOSITORY.findOne<
        BonusCategory | undefined
      >({
        where: { bonusCategoryName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'bonusCategoryNameFind',
    'bonusCategoryName',
    'bonusCategory:validate:notUniqueBonusCategoryName',
  )
  async bonusCategoryCreate(
    data: BonusCategoryCreateInputDto,
  ): Promise<BonusCategory> {
    try {
      return await this.BONUS_CATEGORY_REPOSITORY.create<BonusCategory>(data);
    } catch (error) {
      if (
        error.messageCode ===
        'bonusCategory:validate:notUniqueBonusCategoryName'
      ) {
        throw new MessageCodeError(
          'bonusCategory:validate:notUniqueBonusCategoryName',
        );
      }
      throw new MessageCodeError(
        'bonusCategory:create:unableToCreateBonusCategory',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'bonusCategoryNameFind',
    'bonusCategoryName',
    'bonusCategory:validate:notUniqueBonusCategoryName',
  )
  async bonusCategoryUpdate(
    data: BonusCategoryUpdateInputDto,
  ): Promise<BonusCategory> {
    try {
      const res = await this.BONUS_CATEGORY_REPOSITORY.update<BonusCategory>(
        data,
        {
          where: { id: data.id },
          returning: true,
        },
      );
      const [, [val]] = res;
      return val;
    } catch (error) {
      if (
        error.messageCode ===
        'bonusCategory:validate:notUniqueBonusCategoryName'
      ) {
        throw new MessageCodeError(
          'bonusCategory:validate:notUniqueBonusCategoryName',
        );
      }
      throw new MessageCodeError(
        'bonusCategory:update:unableToUpdateBonusCategory',
      );
    }
  }

  @OptimisticLocking(false)
  async bonusCategoryDelete(
    data: BonusCategoryDeleteInputDto,
  ): Promise<Number> {
    try {
      return await this.BONUS_CATEGORY_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
