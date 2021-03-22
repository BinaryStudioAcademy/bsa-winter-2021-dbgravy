import { Routine } from 'redux-saga-routines';
import { IEditorState } from '../common/models/editor/IEditorState';
import { fetchEditorComponentsRoutine } from '../scenes/Apps/routines';

const initialState = {
  components: {}
};

export const appsEditor = (state: IEditorState = initialState, { type, payload }: Routine<any>): IEditorState => {
  switch (type) {
    case fetchEditorComponentsRoutine.SUCCESS:
      return {
        ...state,
        components: { ...payload }
      };
    default:
      return state;
  }
};