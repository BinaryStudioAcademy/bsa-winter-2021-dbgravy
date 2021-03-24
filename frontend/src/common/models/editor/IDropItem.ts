import { ComponentType } from '../../enums/ComponentType';
import { IButton } from './IButton';
import { IInputText } from './input/IInputText';
import { ITable } from './ITable';

type IComponent = IInputText | ITable | IButton;

export interface IDropItem {
  top: number,
  left: number,
  title: string,
  width: string,
  height:string
  componentType: ComponentType
  component: IComponent
}
