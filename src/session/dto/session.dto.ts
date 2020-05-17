import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SessionDto {
  @Field(() => ID) id: number;
  @Field(() => Int, { nullable: false }) userId: number;
  @Field(() => String, { nullable: false }) refreshToken: string;
  @Field(() => Int, { nullable: false }) expiresIn: number;
  @Field(() => String, { nullable: false }) fingerprint: string;
}
