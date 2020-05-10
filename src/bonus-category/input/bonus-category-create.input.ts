import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BonusCategoryCreateInput {
  @Field({ nullable: false }) bonusCategoryName: string;
}
