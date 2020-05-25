import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AgreementStatusDto } from '../../agreement-status/dto/agreement-status.dto';
import { CustomerDto } from '../../customer/dto/customer.dto';
import { UserDto } from '../../user/dto/user.dto';
import { WardDto } from '../../ward/dto/ward.dto';

@ObjectType()
export class AgreementDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) agreementNumber: string;
  @Field({ nullable: false }) agreementDate: Date;
  @Field(() => UserDto, { nullable: false }) user: UserDto;
  @Field(() => CustomerDto, { nullable: false }) customer: CustomerDto;
  @Field(() => WardDto, { nullable: false }) ward: WardDto;
  @Field(() => AgreementStatusDto, { nullable: false })
  agreementStatus: AgreementStatusDto;
  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
  @Field({ nullable: false }) createdAt: Date;
  @Field({ nullable: false }) updatedAt: Date;
}
