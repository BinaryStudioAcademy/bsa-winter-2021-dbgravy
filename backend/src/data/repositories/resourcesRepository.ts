import { EntityRepository, Repository } from 'typeorm';
import { Resource } from '../entities/Resource';
import IResource from '../../common/models/resource/IResource';

@EntityRepository(Resource)
class ResourceRepository extends Repository<Resource> {
  findAll: any;
  async createResource(resource: IResource): Promise<IResource> {
    type newResourceType = typeof Resource | IResource;
    type TResourseFieldValue = (resourseFieldKey: keyof string, resource: IResource) => newResourceType
    type TResourceReturnValue = (resource: any) => newResourceType;
    const resourseFieldValue: TResourseFieldValue = (resourseFieldKey, resources) => {
      const resourceReturnValue: TResourceReturnValue = resourceForReturn => resourceForReturn[resourseFieldKey];
      return resourceReturnValue(resources);
    };
    let newResource: newResourceType = new Resource();

    const resoursesFieldKey: Array<string> = Object.keys(resource);

    resoursesFieldKey.forEach((resourseFieldKey: any) => {
      newResource = resourseFieldValue(resourseFieldKey, resource);
    });
    await this.save(newResource);
    return newResource;
  }

  async updateResourceById(id: string, updateResource: IResource): Promise<IResource> {
    await this.update(
      id,
      updateResource
    );
    return updateResource;
  }

  async getResourceById(id: string): Promise<IResource> {
    const resourse: IResource = await this.findOne({ id });
    return resourse;
  }

  async getResources(): Promise<IResource> {
    const resourse: IResource = await this.findAll();
    return resourse;
  }
}

export default new ResourceRepository();
