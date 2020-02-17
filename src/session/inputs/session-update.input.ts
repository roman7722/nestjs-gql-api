import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class SessionUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) userId: number;
  @Field({ nullable: false }) refreshToken: string;
  @Field({ nullable: false }) expiresIn: number;
  @Field({ nullable: false }) fingerprint: string;
}
