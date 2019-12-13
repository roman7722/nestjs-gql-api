import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true }) firstName: string;
  @Field({ nullable: true }) middleName: string;
  @Field({ nullable: true }) secondName: string;
  @Field({ nullable: false }) username: string;
  @Field({ nullable: false }) passwordHash: string;
  @Field({ nullable: true }) email: string;
  @Field({ nullable: true }) phone: string;
  @Field({ nullable: true }) rem: string;
  @Field(() => String, { nullable: false }) roleId: string;
}
