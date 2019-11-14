import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AgreementService } from './agreement.service';
import { AgreementArgs } from './args/agreement.args';
import { AgreementDto } from './dto/agreement.dto';

@Resolver()
export class AgreementResolver {
  constructor(private readonly agreementService: AgreementService) {}

  @Query(() => [AgreementDto])
  async agreementsFiltered(@Args() { numAgreements }: AgreementArgs) {
    return await this.agreementService.findAgreements(numAgreements);
  }
}
