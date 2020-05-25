import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DistrictDto } from '../../district/dto/district.dto';

@ObjectType()
export class QuarterDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) quarterName: string;
  @Field(() => DistrictDto, { nullable: false }) district: DistrictDto;
  @Field(() => Int, { nullable: false }) version: number;
}
