import { IButton } from './IButton';
import { ICreateComponent } from './ICreateComponent';
import { IInputText } from './IInputText';
import { ITable } from './ITable';

export type IComponentElement = IInputText | ITable | IButton;

export interface IResponseComponent extends ICreateComponent {
  id: string;
  component: IComponentElement;
}
