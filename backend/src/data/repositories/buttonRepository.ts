import { EntityRepository, Repository } from 'typeorm';
import { Button } from '../entities/Button';
import { IButton } from '../../common/models/editor/IButton';

@EntityRepository(Button)
export class ButtonRepository extends Repository<Button> {
  addButton(button: IButton): Promise<Button> {
    return this.create(button).save();
  }

  getButtonById(id: string): Promise<Button> {
    return this.findOne({ where: { id } });
  }

  getButtonByComponentId(componentId: string): Promise<Button> {
    return this.findOne({ where: { componentId } });
  }

  async updateButton(id: string, data: Partial<IButton>): Promise<Button> {
    await this.update(id, data);
    return this.getButtonById(id);
  }

  async deleteButton(id: string): Promise<Button> {
    const component = await this.getButtonByComponentId(id);
    return this.remove(component);
  }
}
