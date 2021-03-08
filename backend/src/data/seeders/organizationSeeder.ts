import { getCustomRepository } from 'typeorm';
import { IOrganization } from '../../common/models/organization/IOrganization';
import { asyncForEach } from '../../common/helpers/arrayHelper';
import OrganizationRepository from '../repositories/organizationRepository';
import { organizations } from '../seed-data/organizations.seed';

export default class OrganizationSeeder {
  public static async execute() {
    await asyncForEach(async (organization: any) => {
      await getCustomRepository(OrganizationRepository).addOrganization(organization as IOrganization);
    }, organizations);
  }
}
