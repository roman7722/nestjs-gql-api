import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BonusCategoryCreateInputDto {
  @Field(() => String, { nullable: false }) bonusCategoryName: string;
}
