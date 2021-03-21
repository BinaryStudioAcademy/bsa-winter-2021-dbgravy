import { IButton } from './IButton';
import { IInputText } from './IInputText';
import { ITable } from './ITable';

type IComponent = IInputText | ITable | IButton;

export interface IDropItem {
  top: number,
  left: number,
  title: string,
  width: string,
  height:string
  componentType: string,
  component: IComponent
}
