import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class UpdateRefreshTokenInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) userId: number;
  @Field({ nullable: false }) roleId: string;
  @Field({ nullable: false }) refreshToken: string;
  @Field({ nullable: false }) expiresIn: number;
  @Field({ nullable: false }) fingerprint: string;
}
