import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SessionCreateInput {
  @Field(() => Int, { nullable: false }) userId: number;
  @Field({ nullable: false }) refreshToken: string;
  @Field({ nullable: false }) expiresIn: number;
  @Field({ nullable: false }) fingerprint: string;
}
