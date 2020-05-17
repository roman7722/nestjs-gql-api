import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCreateInputDto {
  @Field(() => String, { nullable: true }) firstName: string;
  @Field(() => String, { nullable: true }) middleName: string;
  @Field(() => String, { nullable: true }) secondName: string;
  @Field(() => String, { nullable: false }) username: string;
  @Field(() => String, { nullable: false }) passwordHash: string;
  @Field(() => String, { nullable: true }) email: string;
  @Field(() => String, { nullable: true }) phone: string;
  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => String, { nullable: false }) userRoleName: string;
}
