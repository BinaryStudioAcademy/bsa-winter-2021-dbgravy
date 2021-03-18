import { EntityRepository, Repository } from 'typeorm';
import { Trigger } from '../entities/Trigger';
import { ITrigger } from '../../common/models/query/Trigger';

@EntityRepository(Trigger)
export class TriggerRepository extends Repository<Trigger> {
  async getAllTriggersByQueryId(queryId: string): Promise<Array<Trigger>>|null {
    return this.find({ where: { queryId } });
  }
  async addQuery(triggers:Array<ITrigger>, id:string): Promise<void> {
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
    const triggersQuery = await this.find({ where: { triggerQueryId: id } });
    await this.remove(triggers);
    await this.remove(triggersQuery);
  }
  async updateTriggerArray(triggerArray:Array<ITrigger>, id: string): Promise<void> {
    const triggers = await this.getAllTriggersByQueryId(id);
    const newTriggers = triggerArray.map(element => ({
      queryId: id,
      triggerQueryId: element.triggerQueryId,
      success: element.success
    }));
    await this.remove(triggers);
    await this.create(newTriggers);
    await this.save(newTriggers);
  }
}
