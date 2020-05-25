import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BonusCategoryDto } from '../../bonus-category/dto/bonus-category.dto';
import { BonusDto } from '../../bonus/dto/bonus.dto';
import { EmployeeDto } from '../../employee/dto/employee.dto';
import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class EmployeeBonusDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => UserDto, { nullable: false }) user: UserDto;
  @Field(() => EmployeeDto, { nullable: false }) employee: EmployeeDto;
  @Field({ nullable: false }) bonusDate: Date;
  @Field(() => BonusCategoryDto, { nullable: false })
  bonusCategory: BonusCategoryDto;
  @Field(() => BonusDto, { nullable: false }) bonus: BonusDto;
  @Field(() => Float, { nullable: false }) cost: number;
  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
  @Field({ nullable: false }) createdAt: Date;
  @Field({ nullable: false }) updatedAt: Date;
}
