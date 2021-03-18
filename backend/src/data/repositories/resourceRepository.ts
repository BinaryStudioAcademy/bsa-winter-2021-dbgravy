import { EntityRepository, Repository } from 'typeorm';
import { Resource } from '../entities/Resource';
import { ICreateResource } from '../../common/models/resource/ICreateResource';
import { IEditResource } from '../../common/models/resource/IEditResource';

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

  addResource(resource: ICreateResource): Promise<Resource> {
    return this.create(resource).save();
  }

  async updateResource(id: string, data: Partial<IEditResource>): Promise<Resource> {
    await this.update(id, data);
    return this.getResourceById(id);
  }

  async deleteResource(id: string): Promise<Resource> {
    const resource = await this.getResourceById(id);
    return this.remove(resource);
  }
}
