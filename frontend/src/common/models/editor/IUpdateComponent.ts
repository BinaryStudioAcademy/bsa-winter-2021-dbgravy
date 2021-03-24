import { IButton } from './IButton';
import { IInputText } from './input/IInputText';
import { ITable } from './ITable';
import { ComponentType } from '../../enums/ComponentType';

type IComponent = IInputText | ITable | IButton;

export interface IUpdateComponent {
  id: string,
  top?: number,
  left?: number,
  title?: string,
  width?: string,
  height?:string
  componentType?: ComponentType
  component?: IComponent
}
