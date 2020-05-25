import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CityDto } from '../../city/dto/city.dto';

@ObjectType()
export class DistrictDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) districtName: string;
  @Field(() => CityDto, { nullable: false }) city: CityDto;
  @Field(() => Int, { nullable: false }) version: number;
}
