import { getCustomRepository } from 'typeorm';
import { TriggerRepository } from '../data/repositories/triggerRepository';

export const getTriggerQueriesByQueryId = async (id: string): Promise<any> => {
  const triggersId = await getCustomRepository(TriggerRepository).getTriggersByQueryId(id);
  return triggersId;
};

