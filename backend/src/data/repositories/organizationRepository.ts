import { EntityRepository, Repository } from 'typeorm';
import { Organization } from '../entities/Organization';
import { ICreateOrganization } from '../../common/models/organization/ICreateOrganization';

@EntityRepository(Organization)
class OrganizationRepository extends Repository<Organization> {
  addOrganization(data: ICreateOrganization): Promise<Organization> {
    const user = this.create(data);
    return user.save();
  }
}

export default OrganizationRepository;
