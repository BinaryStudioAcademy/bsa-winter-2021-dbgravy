import { ComponentType } from '../../enums/ComponentType';
import { IButton } from './IButton';
import { IInputText } from './IInputText';
import { ITable } from './ITable';

export interface IResponse {
  id:string
  title: string,
  width: string,
  height: string,
  top: number,
  left: number,
  componentType: ComponentType,
  table: ITable|null
  button: IButton|null
  input: IInputText|null
}
