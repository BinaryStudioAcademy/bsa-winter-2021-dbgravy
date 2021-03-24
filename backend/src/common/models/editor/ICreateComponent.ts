import { ComponentType } from '../../enums/ComponentType';

export interface ICreateComponent {
  name: string,
  height: number,
  width: number,
  left: number,
  top: number,
  componentType: ComponentType,
  appId: string
}
