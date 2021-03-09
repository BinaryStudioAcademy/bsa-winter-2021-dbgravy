import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { addAppRoutine, fetchAppRoutine } from '../routines';
import * as appService from '../../../services/applicationService';

function* fetchApps(): Routine<any> {
  try {
    const apps = yield call(appService.getApps);
    console.log(apps);
    yield put(fetchAppRoutine.success(apps));
  } catch (error) {
    console.log('addApp error:', error.message);
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
    console.log('addApp error:', error.message);
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
