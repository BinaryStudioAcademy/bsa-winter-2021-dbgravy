import { Routine } from 'redux-saga-routines';
import { IEditorState } from '../common/models/editor/IEditorState';
import {
  fetchEditorComponentsRoutine,
  setNewInputValue
} from '../scenes/Apps/routines';

const initialState = {
  components: {},
  locals: []
};

export const appsEditor = (state: IEditorState = initialState, { type, payload }: Routine<any>): IEditorState => {
  switch (type) {
    case fetchEditorComponentsRoutine.SUCCESS:
      return {
        ...state,
        components: { ...payload }
      };
    case setNewInputValue.TRIGGER:
      const local = [...state.locals];
      const idx = local.findIndex(e => e.id === payload.id);
      if (!idx || idx !== -1) {
        local[idx].value = payload.value;
      } else {
        local.push({ id: payload.id, value: payload.value });
      }
      return {
        ...state,
        locals: [...local]
      };
    default:
      return state;
  }
};
