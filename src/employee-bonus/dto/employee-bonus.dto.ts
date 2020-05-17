import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { BonusCategoryDto } from '../../bonus-category/dto/bonus-category.dto';
import { BonusDto } from '../../bonus/dto/bonus.dto';
import { EmployeeDto } from '../../employee/dto/employee.dto';
import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class EmployeeBonusDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field(() => UserDto, { nullable: true }) user?: UserDto;
  @Field(() => EmployeeDto, { nullable: true }) employee?: EmployeeDto;
  @Field({ nullable: true }) bonusDate?: Date;
  @Field(() => BonusCategoryDto, { nullable: true })
  bonusCategory?: BonusCategoryDto;
  @Field(() => BonusDto, { nullable: true }) bonus?: BonusDto;
  @Field(() => Float, { nullable: true }) cost?: number;
  @Field(() => String, { nullable: true }) rem?: string;
  @Field(() => Int, { nullable: true }) version?: number;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
