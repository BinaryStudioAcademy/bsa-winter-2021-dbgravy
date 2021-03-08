import { EntityRepository, Repository } from 'typeorm';
import { App } from '../entities/App';
import { ICreateApplication } from '../../common/models/application/ICreateApplication';
import { IEditApplication } from '../../common/models/application/IEditApplication';

@EntityRepository(App)
export class ApplicationRepository extends Repository<App> {
  addApp(application: ICreateApplication): Promise<App> {
    return this.create(application).save();
  }

  getAllApp(): Promise<Array<App>> {
    return this.find();
  }

  getAppById(id: string): Promise<App> {
    return this.findOne({ where: { id } });
  }

  getAppByName(name: string): Promise<App> {
    return this.findOne({ where: { name } });
  }

  async updateApp(id: string, data: Partial<IEditApplication>): Promise<App> {
    await this.update(id, data);
    return this.getAppById(id);
  }

  async deleteApp(id: string): Promise<App> {
    const app = await this.getAppById(id);
    return this.remove(app);
  }
}
