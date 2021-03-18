import { EntityRepository, Repository } from 'typeorm';
import { Query } from '../entities/Query';
import { ICreateQuery } from '../../common/models/query/ICreateQuery';
import { IUpdateQuery } from '../../common/models/query/IUpdateQuery';

@EntityRepository(Query)
export class QueryRepository extends Repository<Query> {
  async getAllQueryByAppId(appId: string): Promise<Array<Query>> {
    const response = await this.find({ where: { appId }, relations: ['triggers'] });
    return response;
  }

  getQueryById(id: string): Promise<Query> {
    return this.findOne({ where: { id }, relations: ['triggers'] });
  }

  async addQuery(query: ICreateQuery): Promise<Query> {
    const response = await this.create(query).save();
    return response;
  }

  async updateQuery(id: string, data: Required<IUpdateQuery>|Partial<IUpdateQuery>): Promise<void> {
    await this.update(id, data);
  }

  async deleteQuery(id: string): Promise<void> {
    const query = await this.getQueryById(id);
    await this.remove(query);
  }
}
