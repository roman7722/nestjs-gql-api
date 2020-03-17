import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class WhatAboutUsDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) whatAboutUsName?: string;
}
