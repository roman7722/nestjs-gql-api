import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AgreementStatusDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) agreementStatusName: string;
  @Field(() => String, { nullable: true }) style: string;
  @Field(() => Int, { nullable: false }) version: number;
}
