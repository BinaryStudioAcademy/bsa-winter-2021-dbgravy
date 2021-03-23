import { EntityRepository, Repository } from 'typeorm';
import { Component } from '../entities/Component';
import { ICreateComponent } from '../../common/models/components/ICreateComponent';

@EntityRepository(Component)
export class ComponentRepository extends Repository<Component> {
  addComponent(component: ICreateComponent): Promise<Component> {
    return this.create(component).save();
  }

  getAllComponentsByAppId(appId: string): Promise<Array<Component>> {
    return this.find({
      where: { appId }
    });
  }

  getComponentById(id: string): Promise<Component> {
    return this.findOne({ where: { id } });
  }

  getComponentByAppIdAndNameId(appId: string, name: string): Promise<Component> {
    return this.findOne({ where: { name, appId } });
  }

  async updateApp(id: string, data: Partial<ICreateComponent>): Promise<Component> {
    await this.update(id, data);
    return this.getComponentById(id);
  }

  async deleteComponent(id: string): Promise<Component> {
    const component = await this.getComponentById(id);
    return this.remove(component);
  }
}
