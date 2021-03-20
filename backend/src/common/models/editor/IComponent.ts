import { IButton } from './IButton';
import { IInputText } from './IInputText';
import { ITable } from './ITable';

type IComponentType = IInputText | ITable | IButton;

export interface IComponent {
  top: number,
  left: number,
  title: string,
  width: string,
  height:string
  componentType: string,
  component: IComponentType
}
