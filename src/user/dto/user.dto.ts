import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserRoleDto } from '../../user-role/dto/user-role.dto';

@ObjectType()
export class UserDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: true }) firstName: string;
  @Field(() => String, { nullable: true }) middleName: string;
  @Field(() => String, { nullable: true }) secondName: string;
  @Field(() => String, { nullable: true }) displayName: string;
  @Field(() => String, { nullable: false }) username: string;
  @Field(() => String, { nullable: true }) email: string;
  @Field(() => String, { nullable: true }) phone: string;
  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => UserRoleDto, { nullable: false }) userRole: UserRoleDto;
  @Field(() => Int, { nullable: false }) version: number;
  @Field({ nullable: false }) createdAt: Date;
  @Field({ nullable: false }) updatedAt: Date;
}
