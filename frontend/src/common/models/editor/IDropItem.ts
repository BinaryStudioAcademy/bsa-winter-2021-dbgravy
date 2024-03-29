import { ComponentType } from '../../enums/ComponentType';
import { IButton } from './IButton';
import { IInputText } from './IInputText';
import { ITable } from './ITable';

export type IComponent = IInputText | ITable | IButton;

export interface IDropItem {
  id: string;
  name: string;
  top: number,
  left: number,
  title: string,
  width: string | number,
  height:string | number,
  componentType: ComponentType
  component: IComponent
}
