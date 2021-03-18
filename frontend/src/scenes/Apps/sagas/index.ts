import { all, put, call, takeEvery, select } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { addAppRoutine, deleteAppRoutine, editAppRoutine, fetchAppRoutine, showEditRoutine } from '../routines';
import * as appService from '../../../services/applicationService';
import { IAppState } from '../../../common/models/store/IAppState';
import { IApps } from '../../../common/models/apps/IApps';

function* fetchApps(): Routine<any> {
  try {
    const apps = yield call(appService.getApps);
    yield put(fetchAppRoutine.success(apps));
  } catch (error) {
    yield put(fetchAppRoutine.failure(error));
  }
}

function* watchFetchApps() {
  yield takeEvery(fetchAppRoutine.TRIGGER, fetchApps);
}

function* addApp({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(appService.addApp, payload);
    yield put(fetchAppRoutine.trigger());
  } catch (error) {
    yield put(addAppRoutine.failure(error));
  }
}

const selectApp = (state: IAppState) => state.app.application.editedApp;

function* deleteApp() {
  const { app } = yield select(selectApp);
  try {
    yield call(appService.deleteApp, app);
    yield put(deleteAppRoutine.success());
    yield put(fetchAppRoutine.trigger());
  } catch {
    yield put(deleteAppRoutine.failure({ app }));
  }
}

function* editApp() {
  const { app, name } = yield select(selectApp);
  try {
    const response: IApps = yield call(appService.editApp, app, { name });
    yield put(editAppRoutine.success(response));
    yield put(showEditRoutine.trigger(false));
  } catch {
    yield put(editAppRoutine.failure({ app }));
  }
}

function* watchAppsEdit() {
  yield takeEvery(editAppRoutine.TRIGGER, editApp);
  yield takeEvery(deleteAppRoutine.TRIGGER, deleteApp);
}

function* watchAddApp() {
  yield takeEvery(addAppRoutine.TRIGGER, addApp);
}

export default function* appSaga() {
  yield all([watchAddApp(), watchFetchApps(), watchAppsEdit()]);
}
