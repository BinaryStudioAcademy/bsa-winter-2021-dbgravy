import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { runQueryRoutine, previewQueryRoutine } from './routine';
import * as queryService from '../../services/queryService';

function* runQuery({ payload }: Routine<any>): Routine<any> {
  try {
    const resultData = yield call(queryService.runQuery, payload);
    yield put(runQueryRoutine.success(resultData));
  } catch (error) {
    console.log('error');
    yield put(runQueryRoutine.failure(error));
  }
}

function* watchRunQuery() {
  yield takeEvery(runQueryRoutine.TRIGGER, runQuery);
}

function* previewQuery({ payload }: Routine<any>): Routine<any> {
  try {
    const resultData = yield call(queryService.previewQuery, payload);
    console.log(resultData);
    yield put(previewQueryRoutine.success(resultData));
  } catch (error) {
    console.log('error');
    yield put(previewQueryRoutine.failure(error));
  }
}

function* watchPreviewQuery() {
  yield takeEvery(previewQueryRoutine.TRIGGER, previewQuery);
}

export default function* querySaga() {
  yield all([watchRunQuery(), watchPreviewQuery()]);
}
