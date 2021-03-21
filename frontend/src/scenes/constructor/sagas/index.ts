import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import {
  deleteSelectQueryRoutine,
  duplicateSelectQueryRoutine, errorRoutineQuery,
  fetchQueryRoutine, openQueryRoutine,
  saveSelectQueryRoutine, takeResourcesTableAndColumns
} from '../routines';
import { IQuery } from '../../../common/models/apps/querys';
import { addQuery, deleteQuery, fetchQueries, updateQuery } from '../../../services/queryService';
import { takeResourceTables } from '../../../services/resourceService';

function* fetchQuery({ payload }: Routine<any>) {
  try {
    const queries:Array<IQuery> = yield call(fetchQueries, payload.id);
    yield put(fetchQueryRoutine.success(queries));
    yield put(openQueryRoutine.success(queries));
  } catch (e) {
    yield put(errorRoutineQuery.failure(e.message));
  }
}

function* watchQueryRequest() {
  yield takeEvery(fetchQueryRoutine.TRIGGER, fetchQuery);
}

function* saveQuery({ payload }: Routine<any>) {
  try {
    const queries:IQuery = yield call(addQuery, payload);
    yield put(duplicateSelectQueryRoutine.success(queries));
  } catch (e) {
    yield put(errorRoutineQuery.failure(e.message));
  }
}

function* watchSaveQueryRequest() {
  yield takeEvery(duplicateSelectQueryRoutine.TRIGGER, saveQuery);
}

function* updateQueryData({ payload }: Routine<any>) {
  try {
    const queries:Array<IQuery> = yield call(updateQuery, payload);
    yield put(fetchQueryRoutine.success(queries));
  } catch (e) {
    yield put(errorRoutineQuery.failure(e.message));
  }
}

function* watchUpdateNameQueryRequest() {
  yield takeEvery(saveSelectQueryRoutine.TRIGGER, updateQueryData);
}

function* deleteSelectQuery({ payload }: Routine<any>) {
  try {
    const queries:Array<IQuery> = yield call(deleteQuery, payload);
    yield put(fetchQueryRoutine.success(queries));
    yield put(openQueryRoutine.success(queries));
  } catch (e) {
    yield put(errorRoutineQuery.failure(e.message));
  }
}

function* watchDeleteQueryRequest() {
  yield takeEvery(deleteSelectQueryRoutine.TRIGGER, deleteSelectQuery);
}

function* takeRecourseData({ payload }: Routine<any>) {
  try {
    const tables:Array<any> = yield call(takeResourceTables, payload);
    yield put(takeResourcesTableAndColumns.success(tables));
  } catch (e) {
    yield put(errorRoutineQuery.failure(e.message));
  }
}

function* watchTakeRecourseRequest() {
  yield takeEvery(takeResourcesTableAndColumns.TRIGGER, takeRecourseData);
}

export default function* userSaga() {
  yield all([
    watchQueryRequest(),
    watchSaveQueryRequest(),
    watchUpdateNameQueryRequest(),
    watchDeleteQueryRequest(),
    watchTakeRecourseRequest()
  ]);
}
