import { EntityRepository, Repository } from 'typeorm';
import { Component } from '../entities/Component';
import { ICreateComponent } from '../../common/models/editor/ICreateComponent';

@EntityRepository(Component)
export class ComponentRepository extends Repository<Component> {
  getAllComponents(appId: string): Promise<Component[]> {
    return this.find({ where: { appId } });
  }
  addComponent(component: ICreateComponent): Promise<Component> {
    return this.create(component).save();
  }

  async updateComponent(component: any) {
    const { id } = component;
    await this.update(id, component);
  }
}
