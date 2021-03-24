import { ComponentType } from '../../enums/ComponentType';
import { IButton } from './IButton';
import { IInputText } from './IInputText';
import { ITable } from './ITable';

type IComponent = IInputText | ITable | IButton;

export interface IDropItem {
  id:string
  top: number,
  left: number,
  title: string,
  width: string,
  height:string
  componentType: ComponentType
  component: IComponent
  table: ITable|null
  button: IButton|null
  input: IInputText|null
}
