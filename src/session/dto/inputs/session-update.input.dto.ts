import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SessionUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => Int, { nullable: false }) userId: number;
  @Field(() => String, { nullable: false }) refreshToken: string;
  @Field(() => Int, { nullable: false }) expiresIn: number;
  @Field(() => String, { nullable: false }) fingerprint: string;
}
