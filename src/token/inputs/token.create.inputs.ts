import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CreateRefreshTokenInput {
  @Field(() => Int, { nullable: false }) userId: number;
  @Field({ nullable: false }) roleId: string;
  @Field({ nullable: false }) refreshToken: string;
  @Field({ nullable: false }) expiresIn: number;
  @Field({ nullable: false }) fingerprint: string;
}
