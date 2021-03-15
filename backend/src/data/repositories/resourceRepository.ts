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

  async deleteResource(id: string): Promise<Resource> {
    const resource = await this.getResourceById(id);
    return this.remove(resource);
  }

  async updateResource(id: string, data: Partial<Resource>): Promise<Resource> {
    await this.update(id, data);
    return this.getResourceById(id);
  }
}
