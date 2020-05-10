import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CityDto } from '../../city/dto/city.dto';
import { DistrictDto } from '../../district/dto/district.dto';
import { EmployeeStatusDto } from '../../employee-status/dto/employee-status.dto';
import { OperationModeDto } from '../../operation-mode/dto/operation-mode.dto';
import { QuarterDto } from '../../quarter/dto/quarter.dto';
import { TypeJobDto } from '../../type-job/dto/type-job.dto';
import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class EmployeeDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field(() => UserDto, { nullable: true }) user?: UserDto;
  @Field({ nullable: true }) employeeName?: string;
  @Field({ nullable: true }) hbDate?: Date;
  @Field(() => CityDto, { nullable: true }) city?: CityDto;
  @Field(() => DistrictDto, { nullable: true }) district?: DistrictDto;
  @Field(() => QuarterDto, { nullable: true }) quarter?: QuarterDto;
  @Field({ nullable: true }) street?: string;
  @Field({ nullable: true }) house?: string;
  @Field({ nullable: true }) apartment?: string;
  @Field({ nullable: true }) education?: string;
  @Field({ nullable: true }) phone?: string;
  @Field({ nullable: true }) email?: string;
  @Field({ nullable: true }) passportNumber?: string;
  @Field({ nullable: true }) passportIssuedBy?: string;
  @Field(() => EmployeeStatusDto, { nullable: true })
  employeeStatus?: EmployeeStatusDto;
  @Field(() => OperationModeDto, { nullable: true })
  operationMode?: OperationModeDto;
  @Field(() => [TypeJobDto], { nullable: true })
  typeJobs?: TypeJobDto[];
  @Field({ nullable: true }) rem?: string;
  @Field(() => Int, { nullable: true }) version?: number;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
