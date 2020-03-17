import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { subjectCategoryProviders } from './subject-category.providers';
import { SubjectCategoryResolver } from './subject-category.resolver';
import { SubjectCategoryService } from './subject-category.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    SubjectCategoryService,
    SubjectCategoryResolver,
    ...subjectCategoryProviders,
  ],
})
export class SubjectCategoryModule {}
