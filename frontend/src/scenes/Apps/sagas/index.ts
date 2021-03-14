import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { addAppRoutine, fetchAppRoutine } from '../routines';
import * as appService from '../../../services/applicationService';

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

function* watchAddApp() {
  yield takeEvery(addAppRoutine.TRIGGER, addApp);
}

export default function* appSaga() {
  yield all([
    watchAddApp(),
    watchFetchApps()
  ]);
}
