import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ServiceCategoryArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
