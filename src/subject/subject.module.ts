import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { subjectProviders } from './subject.providers';
import { SubjectResolver } from './subject.resolver';
import { SubjectService } from './subject.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [SubjectService, SubjectResolver, ...subjectProviders],
})
export class SubjectModule {}
