import { Field, ID, ObjectType } from 'type-graphql';
import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class AgreementDto {
  @Field(() => ID) id: number;
  @Field({ nullable: false }) numAgreement: string;
  @Field(() => UserDto) user: number;
  @Field({ nullable: false }) dateAgreement: Date;
}
