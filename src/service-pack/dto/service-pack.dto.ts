import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { AgreementDto } from '../../agreement/dto/agreement.dto';
import { ExecutionStatusDto } from '../../execution-status/dto/execution-status.dto';
import { PaymentStatusDto } from '../../payment-status/dto/payment-status.dto';

@ObjectType()
export class ServicePackDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field(() => String, { nullable: true }) agreementData?: string;
  @Field(() => AgreementDto, { nullable: true })
  agreement?: AgreementDto;
  @Field({ nullable: true }) startDate?: Date;
  @Field({ nullable: true }) endDate?: Date;
  @Field(() => Int, { nullable: true }) totalCost?: number;
  @Field(() => Int, { nullable: true }) prepayment?: number;
  @Field(() => Int, { nullable: true }) debt?: number;
  @Field(() => ExecutionStatusDto, { nullable: true })
  executionStatus?: ExecutionStatusDto;
  @Field(() => PaymentStatusDto, { nullable: true })
  paymentStatus?: PaymentStatusDto;
  @Field(() => String, { nullable: true }) rem?: string;
  @Field(() => Int, { nullable: true }) version?: number;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
