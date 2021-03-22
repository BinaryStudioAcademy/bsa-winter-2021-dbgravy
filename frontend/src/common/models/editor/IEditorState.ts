import { IDropItem } from './IDropItem';

export interface IEditorState {
  components: { [key: string]: IDropItem }
}
