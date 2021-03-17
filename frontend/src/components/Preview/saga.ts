import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { runQueryRoutine } from './routine';
import * as queryService from '../../services/queryService';

function* runQuery({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(queryService.runQuery, payload);
  } catch (error) {
    console.log('error');
    yield put(runQueryRoutine.failure(error));
  }
}

function* watchRunQuery() {
  yield takeEvery(runQueryRoutine.TRIGGER, runQuery);
}

export default function* querySaga() {
  yield all([watchRunQuery()]);
}
