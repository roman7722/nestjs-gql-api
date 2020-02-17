import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error';
import Quarter from './quarter.model';
import { QuarterCreateInput } from './input/quarter-create.input';
import { QuarterDeleteInput } from './input/quarter-delete.input';
import { QuarterUpdateInput } from './input/quarter-update.input';

@Injectable()
export class QuarterService {
  constructor(
    @Inject('QUARTER_REPOSITORY')
    private readonly QUARTER_REPOSITORY: typeof Quarter,
  ) {}

  public async checkVersion(id: number): Promise<Quarter | undefined> {
    try {
      return await this.QUARTER_REPOSITORY.findOne<Quarter>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async quarter(id: number): Promise<Quarter> {
    try {
      return await this.QUARTER_REPOSITORY.findOne<Quarter | undefined>({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async quarterList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<Quarter[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.QUARTER_REPOSITORY.findAll<Quarter>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          quarterName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['quarterName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async quarterNameFind(quarterName: string): Promise<Quarter> {
    try {
      return await this.QUARTER_REPOSITORY.findOne<Quarter | undefined>({
        where: { quarterName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async quarterCreate(data: QuarterCreateInput): Promise<Quarter> {
    try {
      const quarter = await this.quarterNameFind(data.quarterName);
      const quarterName = quarter?.getDataValue('quarterName');

      if (quarterName) {
        throw new MessageCodeError('quarter:create:unableToCreateQuarter');
      }

      return await this.QUARTER_REPOSITORY.create<Quarter>({
        ...data,
      });
    } catch (err) {
      throw new MessageCodeError('quarter:create:unableToCreateQuarter');
    }
  }

  @OptimisticLocking(true)
  async quarterUpdate(data: QuarterUpdateInput): Promise<Quarter> {
    try {
      const res = await this.QUARTER_REPOSITORY.update<Quarter>(
        {
          ...data,
        },
        {
          where: { id: data.id },
          returning: true,
        },
      );
      const [, [val]] = res;
      return val;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @OptimisticLocking(false)
  async quarterDelete(data: QuarterDeleteInput): Promise<Number> {
    try {
      const { id, version } = data;
      return await this.QUARTER_REPOSITORY.destroy({
        where: {
          [Op.and]: [{ id }, { version }],
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
