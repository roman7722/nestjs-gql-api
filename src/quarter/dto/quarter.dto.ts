import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { DistrictDto } from '../../district/dto/district.dto';

@ObjectType()
export class QuarterDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) quarterName?: string;
  @Field(() => DistrictDto, { nullable: true }) district?: DistrictDto;
  @Field(() => Int, { nullable: true }) version?: number;
}
