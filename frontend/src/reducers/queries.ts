import { Routine } from 'redux-saga-routines';
import { runQueryRoutine } from '../components/Preview/routine';
import { IQuery } from '../common/models/queries/IQuery';

export interface IQueryState {
  isLoading: boolean,
  queries: Array<IQuery>;
  resultData: any;
}

const initialState = {
  isLoading: true,
  queries: [],
  resultData: null
};

export const query = (state: IQueryState = initialState, { type, payload }: Routine<any>): IQueryState => {
  switch (type) {
    case runQueryRoutine.SUCCESS:
      console.log(payload);
      return {
        ...state,
        resultData: payload,
        isLoading: false
      };
    default:
      return state;
  }
};
