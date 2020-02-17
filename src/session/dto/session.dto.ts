import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class SessionDto {
  @Field(() => ID) id: number;
  @Field({ nullable: false }) userId: number;
  @Field({ nullable: false }) refreshToken: string;
  @Field({ nullable: false }) expiresIn: number;
  @Field({ nullable: false }) fingerprint: string;
}
