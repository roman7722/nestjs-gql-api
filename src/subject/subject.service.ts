import { isEmpty } from 'lodash';
import { Op } from 'sequelize';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckIsValueUnique, OptimisticLocking } from '../common/decorators';
import { MessageCodeError } from '../common/error';
import SubjectCategory from '../subject-category/subject-category.model';
import { SubjectCreateInput } from './input/subject-create.input';
import { SubjectDeleteInput } from './input/subject-delete.input';
import { SubjectUpdateInput } from './input/subject-update.input';
import Subject from './subject.model';

@Injectable()
export class SubjectService {
  constructor(
    @Inject('SUBJECT_REPOSITORY')
    private readonly SUBJECT_REPOSITORY: typeof Subject,
  ) {}

  public async checkVersion(id: number): Promise<Subject | undefined> {
    try {
      return await this.SUBJECT_REPOSITORY.findOne<Subject>({
        where: { id },
        attributes: ['version'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async subject(id: number): Promise<Subject> {
    try {
      return await this.SUBJECT_REPOSITORY.findOne<Subject | undefined>({
        where: { id },
        include: [SubjectCategory],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async subjectList(
    textFilter: string,
    page: number,
    paging: number,
  ): Promise<Subject[] | undefined> {
    try {
      const iRegexp: string = isEmpty(textFilter)
        ? ``
        : `(^${textFilter})|( ${textFilter})`;
      return await this.SUBJECT_REPOSITORY.findAll<Subject>({
        limit: paging,
        offset: (page - 1) * paging,
        where: {
          subjectName: {
            [Op.iRegexp]: iRegexp,
          },
        },
        order: [['subjectName', 'ASC']],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async subjectNameFind(subjectName: string): Promise<Subject> {
    try {
      return await this.SUBJECT_REPOSITORY.findOne<Subject | undefined>({
        where: { subjectName },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @CheckIsValueUnique(
    'subjectNameFind',
    'subjectName',
    'subject:validate:notUniqueSubjectName',
  )
  async subjectCreate(data: SubjectCreateInput): Promise<Subject> {
    try {
      return await this.SUBJECT_REPOSITORY.create<Subject>(data);
    } catch (error) {
      if (error.messageCode === 'subject:validate:notUniqueSubjectName') {
        throw new MessageCodeError('subject:validate:notUniqueSubjectName');
      }
      throw new MessageCodeError('subject:create:unableToCreateSubject');
    }
  }

  @OptimisticLocking(true)
  @CheckIsValueUnique(
    'subjectNameFind',
    'subjectName',
    'subject:validate:notUniqueSubjectName',
  )
  async subjectUpdate(data: SubjectUpdateInput): Promise<Subject> {
    try {
      const res = await this.SUBJECT_REPOSITORY.update<Subject>(data, {
        where: { id: data.id },
        returning: true,
      });
      const [, [val]] = res;
      return val;
    } catch (error) {
      if (error.messageCode === 'subject:validate:notUniqueSubjectName') {
        throw new MessageCodeError('subject:validate:notUniqueSubjectName');
      }
      throw new MessageCodeError('subject:update:unableToUpdateSubject');
    }
  }

  @OptimisticLocking(false)
  async subjectDelete(data: SubjectDeleteInput): Promise<Number> {
    try {
      return await this.SUBJECT_REPOSITORY.destroy({
        where: { id: data.id },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
