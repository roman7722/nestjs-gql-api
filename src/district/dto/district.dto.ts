import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CityDto } from '../../city/dto/city.dto';

@ObjectType()
export class DistrictDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) districtName?: string;
  @Field(() => CityDto, { nullable: true }) city?: CityDto;
  @Field(() => Int, { nullable: true }) version?: number;
}
