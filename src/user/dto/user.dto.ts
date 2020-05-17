import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserRoleDto } from '../../user-role/dto/user-role.dto';

@ObjectType()
export class UserDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field(() => String, { nullable: true }) firstName?: string;
  @Field(() => String, { nullable: true }) middleName?: string;
  @Field(() => String, { nullable: true }) secondName?: string;
  @Field(() => String, { nullable: true }) displayName?: string;
  @Field(() => String, { nullable: true }) username?: string;
  @Field(() => String, { nullable: true }) email?: string;
  @Field(() => String, { nullable: true }) phone?: string;
  @Field(() => String, { nullable: true }) rem?: string;
  @Field(() => UserRoleDto, { nullable: true }) userRole?: UserRoleDto;
  @Field(() => Int, { nullable: true }) version?: number;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
