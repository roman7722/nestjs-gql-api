import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AgreementDto } from '../../agreement/dto/agreement.dto';
import { ExecutionStatusDto } from '../../execution-status/dto/execution-status.dto';
import { PaymentStatusDto } from '../../payment-status/dto/payment-status.dto';

@ObjectType()
export class ServicePackDto {
  @Field(() => Int, { nullable: false }) id: number;
  /** Agreement data 'agreementNumber (customerSecondName/wardSecondName)' */
  @Field(() => String, { nullable: true }) agreementData: string;
  @Field(() => AgreementDto, { nullable: false })
  agreement: AgreementDto;
  @Field({ nullable: true }) startDate: Date;
  @Field({ nullable: true }) endDate: Date;
  @Field(() => Int, { nullable: true }) totalCost: number;
  @Field(() => Int, { nullable: true }) prepayment: number;
  @Field(() => Int, { nullable: true }) debt: number;
  @Field(() => ExecutionStatusDto, { nullable: false })
  executionStatus: ExecutionStatusDto;
  @Field(() => PaymentStatusDto, { nullable: false })
  paymentStatus: PaymentStatusDto;
  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
  @Field({ nullable: false }) createdAt: Date;
  @Field({ nullable: false }) updatedAt: Date;
}
