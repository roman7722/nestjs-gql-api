import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { EmployeeDto } from '../../employee/dto/employee.dto';
import { PositionDto } from '../../position/dto/position.dto';
import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class EmployeePositionDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field(() => UserDto, { nullable: true }) user?: UserDto;
  @Field(() => EmployeeDto, { nullable: true }) employee?: EmployeeDto;
  @Field({ nullable: true }) positionDateStart?: Date;
  @Field({ nullable: true }) positionDateEnd?: Date;
  @Field(() => PositionDto, { nullable: true }) position?: PositionDto;
  @Field(() => Float, { nullable: true }) tariff?: number;
  @Field(() => String, { nullable: true }) rem?: string;
  @Field(() => Int, { nullable: true }) version?: number;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
