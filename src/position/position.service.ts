import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import { PositionCreateInputDto } from './dto/input/position-create.input.dto';
import { PositionDeleteInputDto } from './dto/input/position-delete.input.dto';
import { PositionUpdateInputDto } from './dto/input/position-update.input.dto';
import Position from './position.model';

@Injectable()
export class PositionService {
  constructor(
    @Inject('POSITION_REPOSITORY')
    private readonly POSITION_REPOSITORY: typeof Position,
  ) {}

  public async checkVersion(id: number): Promise<Position | undefined> {
    try {
      return await this.POSITION_REPOSITORY.findOne<Position>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async position(id: number): Promise<Position> {
    try {
      return await this.POSITION_REPOSITORY.findOne<Position | undefined>({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async positionList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<Position[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.POSITION_REPOSITORY.findAll<Position>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          positionName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['positionName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async positionNameFind(positionName: string): Promise<Position> {
    try {
      return await this.POSITION_REPOSITORY.findOne<Position | undefined>({
        where: { positionName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'positionNameFind',
    'positionName',
    'position:validate:notUniquePositionName',
  )
  async positionCreate(data: PositionCreateInputDto): Promise<Position> {
    try {
      return await this.POSITION_REPOSITORY.create<Position>(data);
    } catch (error) {
      if (error.messageCode === 'position:validate:notUniquePositionName') {
        throw new MessageCodeError('position:validate:notUniquePositionName');
      }
      throw new MessageCodeError('position:create:unableToCreatePosition');
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'positionNameFind',
    'positionName',
    'position:validate:notUniquePositionName',
  )
  async positionUpdate(data: PositionUpdateInputDto): Promise<Position> {
    try {
      const res = await this.POSITION_REPOSITORY.update<Position>(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      if (error.messageCode === 'position:validate:notUniquePositionName') {
        throw new MessageCodeError('position:validate:notUniquePositionName');
      }
      throw new MessageCodeError('position:update:unableToUpdatePosition');
    }
  }

  @OptimisticLocking(false)
  async positionDelete(data: PositionDeleteInputDto): Promise<Number> {
    try {
      return await this.POSITION_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
