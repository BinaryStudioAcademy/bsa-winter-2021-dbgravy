import { Routine } from 'redux-saga-routines';
import { IDropItem } from '../common/models/editor/IDropItem';
import { IEditorState } from '../common/models/editor/IEditorState';
import {
  fetchEditorComponentsRoutine,
  localUpdateComponentRoutine,
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
    case localUpdateComponentRoutine.SUCCESS:
      return {
        ...state,
        components: Object.fromEntries(Object.entries(state.components).map(([key, value]) => {
          let newValue;
          if (key === payload.component.id) {
            newValue = { ...value, component: { left: payload.component.left, top: payload.component.top } };
          } else {
            newValue = { ...value };
          }
          return [key, newValue];
        })) as {
          [key: string]: IDropItem;
        }
      };
    default:
      return state;
  }
};
