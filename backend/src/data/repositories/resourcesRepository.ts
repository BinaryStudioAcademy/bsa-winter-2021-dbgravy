import { EntityRepository, Repository } from 'typeorm';
import IResource from '../../common/models/resource/IResource';
import { Resource } from '../entities/Resource';

@EntityRepository(Resource)
export class ResourceRepository extends Repository<Resource> {
  async createResource(resource: IResource): Promise<Resource> {
    const { firstname, lastname, email, password } = resource;
    const newResource = new Resource();

    newResource.firstname = firstname;
    newResource.lastname = lastname;
    newResource.email = email;
    newResource.password = password;
    await this.save(newResource);
    return newResource;
  }

  async getByEmail(email: string): Promise<Resource> {
    const resource: Resource = await this.findOne({ email });
    return resource;
  }

  async getById(id: string): Promise<Resource> {
    const resource: Resource = await this.findOne({ id });
    return resource;
  }
}
