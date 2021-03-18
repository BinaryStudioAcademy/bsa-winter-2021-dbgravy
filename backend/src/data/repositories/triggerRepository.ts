import { EntityRepository, Repository } from 'typeorm';
import { Trigger } from '../entities/Trigger';

@EntityRepository(Trigger)
export class TriggerRepository extends Repository<Trigger> {
  async getTriggersByQueryId(queryId: string): Promise<Trigger[]> {
    const triggers: Trigger[] = await this.find({ where: { queryId } });
    return triggers;
  }
}
