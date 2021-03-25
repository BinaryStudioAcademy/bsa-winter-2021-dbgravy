import { EntityRepository, Repository } from 'typeorm';
import { Input } from '../entities/Input';
import { ICreateInput } from '../../common/models/editor/input/ICreateInput';
import { IInputText } from '../../common/models/editor/IInputText';

@EntityRepository(Input)
export class InputRepository extends Repository<Input> {
  addInput(input: ICreateInput): Promise<Input> {
    return this.create(input).save();
  }

  getById(id: string): Promise<Input> {
    return this.findOne({ where: { id } });
  }

  async updateInput(id: string, data: Partial<IInputText>): Promise<Input> {
    await this.update(id, data);
    return this.getById(id);
  }

  getByComponentId(componentId: string): Promise<Input> {
    return this.findOne({ where: { componentId } });
  }

  async deleteInput(id: string): Promise<Input> {
    const component = await this.getByComponentId(id);
    return this.remove(component);
  }
}
