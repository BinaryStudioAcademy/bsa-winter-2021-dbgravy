export interface IButton {
  text: string,
  color: string,
  queryId: string,
  componentId: string
}
export interface ITransportedButton extends IButton{
  id: string;
}
