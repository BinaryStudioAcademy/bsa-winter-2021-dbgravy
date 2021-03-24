import { IButton } from './IButton';
import { IInputText } from './input/IInputText';
import { ITable } from './ITable';

type IComponentType = IInputText | ITable | IButton;

export interface IComponent {
  top: number,
  left: number,
  name: string,
  width: string,
  height:string
  componentType: string,
  component: IComponentType
}
