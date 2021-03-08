import { EntityRepository, Repository } from 'typeorm';
import { Organization } from '../entities/Organization';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {
  async getById(id: string): Promise<Organization> {
    const orgatization: Organization = await this.findOne({ id });
    return orgatization;
  }
}
