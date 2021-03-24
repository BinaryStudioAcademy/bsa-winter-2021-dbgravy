import { Routine } from 'redux-saga-routines';
import { IEditorState } from '../common/models/editor/IEditorState';
import { fetchEditorComponentsRoutine, setNewInputValue } from '../scenes/Apps/routines';

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
    default:
      return state;
  }
};
