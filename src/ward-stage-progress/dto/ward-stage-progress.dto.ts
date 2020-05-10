import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { WardStageDto } from '../../ward-stage/dto/ward-stage.dto';
import { WardDto } from '../../ward/dto/ward.dto';

@ObjectType()
export class WardStageProgressDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) wardStageDate?: Date;
  @Field(() => WardStageDto, { nullable: true }) wardStage?: WardStageDto;
  @Field(() => WardDto, { nullable: true }) ward?: WardDto;
  @Field({ nullable: true }) rem?: string;
  @Field(() => Int, { nullable: true }) version?: number;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
