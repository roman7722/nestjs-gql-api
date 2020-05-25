import { Field, Int, ObjectType } from '@nestjs/graphql';
import { WardStageDto } from '../../ward-stage/dto/ward-stage.dto';
import { WardDto } from '../../ward/dto/ward.dto';

@ObjectType()
export class WardStageProgressDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) wardStageDate: Date;
  @Field(() => WardStageDto, { nullable: false }) wardStage: WardStageDto;
  @Field(() => WardDto, { nullable: false }) ward: WardDto;
  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
  @Field({ nullable: false }) createdAt: Date;
  @Field({ nullable: false }) updatedAt: Date;
}
