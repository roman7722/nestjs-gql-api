import { Field, ID, ObjectType } from 'type-graphql';
import { UserRoleDto } from '../../user-role/dto/user-role.dto';

@ObjectType()
export class UserDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) firstName?: string;
  @Field({ nullable: true }) middleName?: string;
  @Field({ nullable: true }) secondName?: string;
  @Field({ nullable: true }) displayName?: string;
  @Field({ nullable: true }) username?: string;
  @Field({ nullable: true }) email?: string;
  @Field({ nullable: true }) phone?: string;
  @Field({ nullable: true }) rem?: string;
  @Field(() => UserRoleDto, { nullable: true }) role?: UserRoleDto;
}
