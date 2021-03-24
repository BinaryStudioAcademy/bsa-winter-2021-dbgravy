export interface IInputText {
  type: string,
  label: string,
  defaultValue: string,
  placeholder: string
}
export interface ITransportedInputText extends IInputText {
  id: string;
}
