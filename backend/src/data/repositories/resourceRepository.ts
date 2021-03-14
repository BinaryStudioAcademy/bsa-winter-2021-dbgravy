import { EntityRepository, Repository } from 'typeorm';
import { Resource } from '../entities/Resource';

@EntityRepository(Resource)
export class ResourceRepository extends Repository<Resource> {
  getAllResourcesByOrganizationId(organizationId: string): Promise<Array<Resource>> {
    return this.find({ where: { organizationId } });
  }

  getResourceById(id: string): Promise<Resource> {
    return this.findOne({ where: { id } });
  }

  getResourceByNameByOrganizationId(name: string, organizationId: string): Promise<Resource> {
    return this.findOne({ where: { name, organizationId } });
  }
}
