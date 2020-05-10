import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { AgreementStatusDto } from '../../agreement-status/dto/agreement-status.dto';
import { CustomerDto } from '../../customer/dto/customer.dto';
import { UserDto } from '../../user/dto/user.dto';
import { WardDto } from '../../ward/dto/ward.dto';

@ObjectType()
export class AgreementDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) agreementNumber?: string;
  @Field({ nullable: true }) agreementDate?: Date;
  @Field(() => UserDto, { nullable: true }) user?: UserDto;
  @Field(() => CustomerDto, { nullable: true }) customer?: CustomerDto;
  @Field(() => WardDto, { nullable: true }) ward?: WardDto;
  @Field(() => AgreementStatusDto, { nullable: true })
  agreementStatus?: AgreementStatusDto;
  @Field({ nullable: true }) rem?: string;
  @Field(() => Int, { nullable: true }) version?: number;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
