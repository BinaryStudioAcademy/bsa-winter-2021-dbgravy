import { Routine } from 'redux-saga-routines';
import { IDropItem } from '../common/models/editor/IDropItem';
import { IEditorState } from '../common/models/editor/IEditorState';
import {
  fetchEditorComponentsRoutine,
  localUpdateComponentRoutine,
  setNewInputValue
} from '../scenes/Apps/routines';

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
    case setNewInputValue.TRIGGER:
      return {
        ...state
        // components: Object.values(state.components).map(comp => {
        //   if (comp.name === action.payload.name) {
        //     return {
        //       ...query,
        //       data: action.payload.resultData
        //     };
        //   }
        //   return query;
        // })
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
