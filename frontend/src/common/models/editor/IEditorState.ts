import { IDropItem } from './IDropItem';
import { ILocal } from './ILocal';

export interface IEditorState {
  components: { [key: string]: IDropItem },
  locals: Array<ILocal>
}
