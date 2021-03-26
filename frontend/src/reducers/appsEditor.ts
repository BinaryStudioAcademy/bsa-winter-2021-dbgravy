import { Routine } from 'redux-saga-routines';
import { IEditorState } from '../common/models/editor/IEditorState';
import {
  fetchEditorComponentsRoutine,
  setNewInputValue
} from '../scenes/Apps/routines';

const initialState = {
  components: {},
  locals: {}
};

export const appsEditor = (state: IEditorState = initialState, { type, payload }: Routine<any>): IEditorState => {
  switch (type) {
    case fetchEditorComponentsRoutine.SUCCESS:
      return {
        ...state,
        components: { ...payload }
      };
    case setNewInputValue.TRIGGER:
      const local = {
        ...state.locals
      };
      local[payload.name] = {
        id: payload.id,
        value: payload.value
      };
      return {
        ...state,
        locals: { ...local }
      };
    default:
      return state;
  }
};
