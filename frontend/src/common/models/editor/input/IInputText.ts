export interface IInputText {
  label: string,
  placeholder: string,
  queryId?: string,
  value?: string,
}
export interface ITransportedInputText extends IInputText {
  id: string;
}
