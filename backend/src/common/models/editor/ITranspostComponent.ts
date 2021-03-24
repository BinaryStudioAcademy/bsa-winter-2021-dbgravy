import { ComponentType } from '../../enums/ComponentType';
import { ITransportedButton } from './IButton';
import { ICreateComponent } from './ICreateComponent';
import { ITransportedInputText } from './IInputText';
import { ITransportedTable } from './ITable';

export interface ITranspostComponent extends ICreateComponent {
  componentType: ComponentType,
  component: ITransportedInputText | ITransportedTable | ITransportedButton;
}
