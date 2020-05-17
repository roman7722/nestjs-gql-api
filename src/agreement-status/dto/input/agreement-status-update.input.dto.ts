import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AgreementStatusUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) agreementStatusName: string;
  @Field(() => String, { nullable: true }) style?: string;
  @Field(() => Int, { nullable: false }) version: number;
}
