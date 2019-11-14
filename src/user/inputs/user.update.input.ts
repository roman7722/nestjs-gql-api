import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: true }) firstName: string;
  @Field({ nullable: true }) middleName: string;
  @Field({ nullable: true }) secondName: string;
  @Field({ nullable: false }) username: string;
  @Field({ nullable: false }) passwordHash: string;
  @Field({ nullable: true }) email: string;
  @Field({ nullable: true }) phone: string;
  @Field({ nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) roleId: number;
}
