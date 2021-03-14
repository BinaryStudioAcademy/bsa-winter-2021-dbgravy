import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import {
  deleteSelectQueryRoutine,
  duplicateSelectQueryRoutine,
  fetchQueryRoutine, openQueryRoutine,
  saveSelectQueryRoutine
} from '../routines';
import { IQuery } from '../../../common/models/apps/querys';
import { addQuery, deleteQuery, fetchQueries, updateQuery } from '../../../services/queryService';

function* fetchQuery({ payload }: Routine<any>) {
  try {
    const queries:Array<IQuery> = yield call(fetchQueries, payload.id);
    yield put(fetchQueryRoutine.success(queries));
    yield put(openQueryRoutine.success(queries));
  } catch (error) {
    console.log(error.message);
  }
}

function* watchQueryRequest() {
  yield takeEvery(fetchQueryRoutine.TRIGGER, fetchQuery);
}

function* saveQuery({ payload }: Routine<any>) {
  try {
    const queries:IQuery = yield call(addQuery, payload);
    yield put(duplicateSelectQueryRoutine.success(queries));
  } catch (error) {
    console.log(error.message);
  }
}

function* watchSaveQueryRequest() {
  yield takeEvery(duplicateSelectQueryRoutine.TRIGGER, saveQuery);
}

function* updateQueryData({ payload }: Routine<any>) {
  try {
    const queries:Array<IQuery> = yield call(updateQuery, payload);
    yield put(fetchQueryRoutine.success(queries));
  } catch (error) {
    console.log(error.message);
  }
}

function* watchUpdateNameQueryRequest() {
  yield takeEvery(saveSelectQueryRoutine.TRIGGER, updateQueryData);
}

function* deleteSelectQuery({ payload }: Routine<any>) {
  try {
    const queries:Array<IQuery> = yield call(deleteQuery, payload);
    console.log(queries);
    yield put(fetchQueryRoutine.success(queries));
    yield put(openQueryRoutine.success(queries));
  } catch (error) {
    console.log(error.message);
  }
}

function* watchDeleteQueryRequest() {
  yield takeEvery(deleteSelectQueryRoutine.TRIGGER, deleteSelectQuery);
}

export default function* userSaga() {
  yield all([
    watchQueryRequest(),
    watchSaveQueryRequest(),
    watchUpdateNameQueryRequest(),
    watchDeleteQueryRequest()
  ]);
}
