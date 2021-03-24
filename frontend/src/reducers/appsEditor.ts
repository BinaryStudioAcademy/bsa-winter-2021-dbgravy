import { Routine } from 'redux-saga-routines';
import { IEditorState } from '../common/models/editor/IEditorState';
import { fetchEditorComponentsRoutine, deleteComponentRoutine } from '../scenes/Apps/routines';

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
    case deleteComponentRoutine.SUCCESS:
      return {
        ...state,
        components: Object.fromEntries(new Map(Object.entries(state.components)
          .filter(el => el[0] !== payload)))
      };
    default:
      return state;
  }
};
