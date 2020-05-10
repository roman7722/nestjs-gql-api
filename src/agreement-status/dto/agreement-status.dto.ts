import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AgreementStatusDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) agreementStatusName?: string;
  @Field({ nullable: true }) style?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
