import { ICreateButton } from './ICreateButton';

type IComponent = ICreateButton;

export interface ICreateComponent {
  name: string;
  heigth: number;
  width: number;
  left: number;
  top: number;
  component: IComponent;
  appId: string;
}
