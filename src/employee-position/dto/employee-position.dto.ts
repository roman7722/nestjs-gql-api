import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { EmployeeDto } from '../../employee/dto/employee.dto';
import { PositionDto } from '../../position/dto/position.dto';
import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class EmployeePositionDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => UserDto, { nullable: false }) user: UserDto;
  @Field(() => EmployeeDto, { nullable: false }) employee: EmployeeDto;
  @Field({ nullable: false }) positionDateStart: Date;
  @Field({ nullable: false }) positionDateEnd: Date;
  @Field(() => PositionDto, { nullable: false }) position: PositionDto;
  @Field(() => Float, { nullable: false }) tariff: number;
  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
  @Field({ nullable: false }) createdAt: Date;
  @Field({ nullable: false }) updatedAt: Date;
}
