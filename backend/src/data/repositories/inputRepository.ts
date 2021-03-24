import { EntityRepository, Repository } from 'typeorm';
import { Input } from '../entities/Input';
import { IInputText } from '../../common/models/editor/input/IInputText';

@EntityRepository(Input)
export class InputRepository extends Repository<Input> {
  getInputById(id: string): Promise<Input> {
    return this.findOne({ where: { id } });
  }

  getInputByComponentId(componentId: string): Promise<Input> {
    return this.findOne({ where: { componentId } });
  }

  addInput(input: IInputText): Promise<Input> {
    return this.create(input).save();
  }

  async updateInput(id: string, data: Partial<IInputText>): Promise<Input> {
    await this.update(id, data);
    return this.getInputById(id);
  }
}
