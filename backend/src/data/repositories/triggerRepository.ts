import { EntityRepository, Repository } from 'typeorm';
import { Trigger } from '../entities/Trigger';
import { ITrigger } from '../../common/models/query/Trigger';

@EntityRepository(Trigger)
export class TriggerRepository extends Repository<Trigger> {
  async getAllTriggersByQueryId(queryId: string): Promise<Array<Trigger>>|null {
    return this.find({ where: { queryId } });
  }
  async addQuery(triggers:Array<ITrigger>|[], id:string): Promise<void> {
    await Promise.all(triggers.map(async (element:{ triggerQueryId: string; success: boolean; }) => {
      await this.create({
        queryId: id,
        triggerQueryId: element.triggerQueryId,
        success: element.success
      }).save();
    }));
  }
  async deleteTriggers(id: string): Promise<void> {
    const triggers = await this.getAllTriggersByQueryId(id);
    const triggers2 = await this.find({ where: { triggerQueryId: id } });
    triggers.forEach(element => {
      this.remove(element);
    });
    await triggers2.forEach(element => {
      this.remove(element);
    });
  }
  async updateTriggerArray(triggerArray:Array<ITrigger>|[], id: string): Promise<void> {
    const triggers = await this.getAllTriggersByQueryId(id);
    await Promise.all(triggers.map(async element => {
      await this.remove(element);
    }));
    await Promise.all(triggerArray.map(async (element:{ triggerQueryId: string; success: boolean; }) => {
      await this.create({
        queryId: id,
        triggerQueryId: element.triggerQueryId,
        success: element.success
      }).save();
    }));
  }
}
