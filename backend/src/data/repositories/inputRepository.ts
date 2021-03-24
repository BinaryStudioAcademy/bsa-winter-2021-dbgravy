import { EntityRepository, Repository } from 'typeorm';
import { Input } from '../entities/Input';
import { ICteateInput } from '../../common/models/editor/input/ICreateInput';
import { IUpdateInput } from '../../common/models/editor/input/IUpdateInput';

@EntityRepository(Input)
export class InputRepository extends Repository<Input> {
  addInput(input: ICteateInput): Promise<Input> {
    return this.create(input).save();
  }

  async updateInput(input: IUpdateInput) {
    const { id } = input;
    await this.update(id, input);
  }
}
