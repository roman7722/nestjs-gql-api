import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error/MessageCodeError';
import { SubjectCategoryCreateInput } from './input/subject-category-create.input';
import { SubjectCategoryDeleteInput } from './input/subject-category-delete.input';
import { SubjectCategoryUpdateInput } from './input/subject-category-update.input';
import SubjectCategory from './subject-category.model';

@Injectable()
export class SubjectCategoryService {
  constructor(
    @Inject('SUBJECT_CATEGORY_REPOSITORY')
    private readonly SUBJECT_CATEGORY_REPOSITORY: typeof SubjectCategory,
  ) {}

  public async checkVersion(id: number): Promise<SubjectCategory | undefined> {
    try {
      return await this.SUBJECT_CATEGORY_REPOSITORY.findOne<SubjectCategory>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async subjectCategory(id: number): Promise<SubjectCategory> {
    try {
      return await this.SUBJECT_CATEGORY_REPOSITORY.findOne<
        SubjectCategory | undefined
      >({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async subjectCategoryList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<SubjectCategory[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.SUBJECT_CATEGORY_REPOSITORY.findAll<SubjectCategory>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          subjectCategoryName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['subjectCategoryName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async subjectCategoryNameFind(
    subjectCategoryName: string,
  ): Promise<SubjectCategory> {
    try {
      return await this.SUBJECT_CATEGORY_REPOSITORY.findOne<
        SubjectCategory | undefined
      >({
        where: { subjectCategoryName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'subjectCategoryNameFind',
    'subjectCategoryName',
    'subjectCategory:validate:notUniqueSubjectCategoryName',
  )
  async subjectCategoryCreate(
    data: SubjectCategoryCreateInput,
  ): Promise<SubjectCategory> {
    try {
      return await this.SUBJECT_CATEGORY_REPOSITORY.create<SubjectCategory>(
        data,
      );
    } catch (error) {
      if (
        error.messageCode ===
        'subjectCategory:validate:notUniqueSubjectCategoryName'
      ) {
        throw new MessageCodeError(
          'subjectCategory:validate:notUniqueSubjectCategoryName',
        );
      }
      throw new MessageCodeError(
        'subjectCategory:create:unableToCreateSubjectCategory',
      );
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'subjectCategoryNameFind',
    'subjectCategoryName',
    'subjectCategory:validate:notUniqueSubjectCategoryName',
  )
  async subjectCategoryUpdate(
    data: SubjectCategoryUpdateInput,
  ): Promise<SubjectCategory> {
    try {
      const res = await this.SUBJECT_CATEGORY_REPOSITORY.update<
        SubjectCategory
      >(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      if (
        error.messageCode ===
        'subjectCategory:validate:notUniqueSubjectCategoryName'
      ) {
        throw new MessageCodeError(
          'subjectCategory:validate:notUniqueSubjectCategoryName',
        );
      }
      throw new MessageCodeError(
        'subjectCategory:update:unableToUpdateSubjectCategory',
      );
    }
  }

  @OptimisticLocking(false)
  async subjectCategoryDelete(
    data: SubjectCategoryDeleteInput,
  ): Promise<Number> {
    try {
      return await this.SUBJECT_CATEGORY_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
