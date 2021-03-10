import { EntityRepository, Repository } from 'typeorm';
import { ICreateOrganization } from '../../common/models/organization/ICreateOrganization';
import { Organization } from '../entities/Organization';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {
  async getById(id: string): Promise<Organization> {
    const orgatization: Organization = await this.findOne({ id });
    return orgatization;
  }

  async getByName(name: string): Promise<Organization> {
    const orgatization: Organization = await this.findOne({ name });
    return orgatization;
  }

  async createOrganization(data: ICreateOrganization): Promise<Organization> {
    const result = await this.create(data).save();
    return result;
  }
}
