import { ComponentType } from '../../enums/ComponentType';
import { IButton } from './IButton';
import { IInputText } from './input/IInputText';
import { ITable } from './ITable';

export interface IResponse {
  title: string,
  width: string,
  height: string,
  top: number,
  left: number,
  componentType: ComponentType,
  component: IInputText | ITable | IButton;
}
