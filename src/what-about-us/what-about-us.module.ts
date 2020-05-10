import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { whatAboutUsProviders } from './what-about-us.providers';
import { WhatAboutUsResolver } from './what-about-us.resolver';
import { WhatAboutUsService } from './what-about-us.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [WhatAboutUsService, WhatAboutUsResolver, ...whatAboutUsProviders],
})
export class WhatAboutUsModule {}
