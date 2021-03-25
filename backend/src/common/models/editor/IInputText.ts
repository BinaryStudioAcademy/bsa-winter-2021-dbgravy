export interface IInputText {
  label: string,
  placeholder: string,
  queryId?: string,
  componentId: string
}

export interface ITransportedInputText extends IInputText {
  id: string;
}
