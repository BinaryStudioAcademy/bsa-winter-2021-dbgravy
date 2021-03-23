import { ITransportedButton } from './button/ITransportedButton';

type IComponent = ITransportedButton;

export interface ITransportedComponent extends IComponent {
  id: string;
  component: IComponent;
}
