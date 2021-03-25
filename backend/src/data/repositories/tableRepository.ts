import { EntityRepository, Repository } from 'typeorm';
import { Table } from '../entities/Table';
import { ITable } from '../../common/models/editor/ITable';

@EntityRepository(Table)
export class TableRepository extends Repository<Table> {
  addTable(table: ITable): Promise<Table> {
    return this.create(table).save();
  }

  getTableById(id: string): Promise<Table> {
    return this.findOne({ where: { id } });
  }

  getTableByComponentId(componentId: string): Promise<Table> {
    return this.findOne({ where: { componentId } });
  }

  async deleteTable(id: string): Promise<Table> {
    const component = await this.getTableByComponentId(id);
    return this.remove(component);
  }

  async updateTable(id: string, data: Partial<ITable>): Promise<Table> {
    await this.update(id, data);
    return this.getTableById(id);
  }
}
