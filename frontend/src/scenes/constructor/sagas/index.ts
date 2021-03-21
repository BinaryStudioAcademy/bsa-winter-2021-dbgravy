import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import {
  deleteSelectQueryRoutine,
  duplicateSelectQueryRoutine, errorRoutineQuery,
  fetchQueryRoutine, openQueryRoutine,
  saveSelectQueryRoutine,
  runSelectQueryRoutine,
  previewSelectQueryRoutine,
  runTriggerRoutine
} from '../routines';
import { IQuery } from '../../../common/models/apps/querys';
import { IAppState } from '../../../common/models/store/IAppState';
import { ITrigger } from '../../../../../backend/src/common/models/query/Trigger';
import {
  addQuery,
  deleteQuery,
  fetchQueries,
  updateQuery,
  runQuery,
  previewQuery
} from '../../../services/queryService';

const query = (state: IAppState) => state.app.qur.queriesApp;

function* fetchQuery({ payload }: Routine<any>) {
  try {
    const queries: Array<IQuery> = yield call(fetchQueries, payload.id);
    yield put(fetchQueryRoutine.success(queries));
    yield put(openQueryRoutine.success(queries));
  } catch (e) {
    yield put(errorRoutineQuery.failure(e.message));
  }
}

function* watchQueryRequest() {
  yield takeEvery(fetchQueryRoutine.TRIGGER, fetchQuery);
}

function* saveQuery({ payload }: Routine<any>): Routine<any> {
  try {
    const queries: IQuery = yield call(addQuery, payload);
    yield put(duplicateSelectQueryRoutine.success(queries));
  } catch (e) {
    yield put(errorRoutineQuery.failure(e.message));
  }
}

function* watchSaveQueryRequest() {
  yield takeEvery(duplicateSelectQueryRoutine.TRIGGER, saveQuery);
}

function* runSelectQuery({ payload }: any): Routine<any> {
  const fulfilledQueries = payload.triggered;
  const { triggers, id, name } = payload.data;
  const queriesApp = yield select(query);
  try {
    if (!fulfilledQueries.includes(id)) {
      const resultData = yield call(runQuery, payload);
      if (fulfilledQueries.length === 0) {
        yield put(runSelectQueryRoutine.success({ resultData, name }));
      } else {
        yield put(runTriggerRoutine.success(`${name} run successfully`));
      }
      if (triggers.length !== 0) {
        fulfilledQueries.push(id);
        yield all(triggers.map((value: ITrigger) => {
          if (value.success) {
            const queryTrigger = queriesApp.find((qur: IQuery) => qur.id === value.triggerQueryId);
            const convertedQueryTrigger = {
              payload: {
                resourceId: queryTrigger.resourceId,
                data: {
                  id: queryTrigger.id,
                  name: queryTrigger.name,
                  code: queryTrigger.code,
                  triggers: queryTrigger.triggers
                },
                appId: queryTrigger.appId,
                triggered: fulfilledQueries
              }
            };
            return call(runSelectQuery, convertedQueryTrigger);
          }
          return [];
        }));
      }
    }
  } catch (e) {
    if (fulfilledQueries.length === 0) {
      yield put(runTriggerRoutine.failure(name));
    }
    if (triggers.length !== 0) {
      fulfilledQueries.push(id);
      yield all(triggers.map((value: ITrigger) => {
        if (!value.success) {
          const queryTrigger = queriesApp.find((qur: IQuery) => qur.id === value.triggerQueryId);
          const convertedQueryTrigger = {
            payload: {
              resourceId: queryTrigger.resourceId,
              data: {
                id: queryTrigger.id,
                name: queryTrigger.name,
                code: queryTrigger.code,
                triggers: queryTrigger.triggers
              },
              appId: queryTrigger.appId,
              triggered: fulfilledQueries
            }
          };
          return call(runSelectQuery, convertedQueryTrigger);
        }
        return [];
      }));
    }
  }
}

function* watchRunQueryRequest() {
  yield takeEvery(runSelectQueryRoutine.TRIGGER, runSelectQuery);
}

function* previewSelectedQuery({ payload }: Routine<any>): Routine<any> {
  try {
    const resultData = yield call(previewQuery, payload);
    yield put(previewSelectQueryRoutine.success(resultData));
  } catch (e) {
    yield put(errorRoutineQuery.failure(e.message));
  }
}

function* watchPreviewQueryRequest() {
  yield takeEvery(previewSelectQueryRoutine.TRIGGER, previewSelectedQuery);
}

function* updateQueryData({ payload }: Routine<any>) {
  try {
    const queries: Array<IQuery> = yield call(updateQuery, payload);
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
    const queries: Array<IQuery> = yield call(deleteQuery, payload);
    yield put(fetchQueryRoutine.success(queries));
    yield put(openQueryRoutine.success(queries));
  } catch (e) {
    yield put(errorRoutineQuery.failure(e.message));
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
    watchDeleteQueryRequest(),
    watchRunQueryRequest(),
    watchPreviewQueryRequest()
  ]);
}
