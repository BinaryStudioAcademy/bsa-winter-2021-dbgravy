import { all, put, call, takeEvery, select } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import {
  addAppRoutine,
  deleteAppRoutine,
  editAppRoutine,
  fetchAppRoutine,
  fetchSelectAppRoutine,
  showEditRoutine,
  fetchEditorComponentsRoutine,
  addComponentRoutine,
  updateComponentRoutine
} from '../routines';
import * as appService from '../../../services/applicationService';
import { IAppState } from '../../../common/models/store/IAppState';
import { IApps } from '../../../common/models/apps/IApps';
import { IDropItem } from '../../../common/models/editor/IDropItem';

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
    yield put(fetchSelectAppRoutine.success(response));
    yield put(showEditRoutine.trigger(false));
  } catch {
    yield put(editAppRoutine.failure({ app }));
  }
}
function* watchAppsEdit() {
  yield takeEvery(editAppRoutine.TRIGGER, editApp);
  yield takeEvery(deleteAppRoutine.TRIGGER, deleteApp);
}

function* fetchSelectApp({ payload }: Routine<any>): Routine<any> {
  try {
    const app = yield call(appService.getAppById, payload.id);
    yield put(fetchSelectAppRoutine.success(app));
  } catch (error) {
    yield put(fetchAppRoutine.failure(error));
  }
}

function* watchFetchSelectApp() {
  yield takeEvery(fetchSelectAppRoutine.TRIGGER, fetchSelectApp);
}

function* watchAddApp() {
  yield takeEvery(addAppRoutine.TRIGGER, addApp);
}

function* fetchComponents({ payload }: Routine<any>) {
  try {
    const components: {[key: string]: IDropItem} = yield call(appService.getComponents, payload.appId);
    yield put(fetchEditorComponentsRoutine.success(components));
  } catch (error) {
    yield put(fetchEditorComponentsRoutine.failure(error));
  }
}

function* watchFetchComponents() {
  yield takeEvery(fetchEditorComponentsRoutine.TRIGGER, fetchComponents);
}

function* addComponent({ payload }: Routine<any>) {
  try {
    yield call(appService.addComponent, payload);
    yield put(fetchEditorComponentsRoutine.trigger({ appId: payload.appId }));
  } catch (error) {
    yield put(addComponentRoutine.failure(error));
  }
}

function* watchAddComponent() {
  yield takeEvery(addComponentRoutine.TRIGGER, addComponent);
}

function* updateComponent({ payload }: Routine<any>) {
  try {
    yield call(appService.updateComponent, payload);
    yield put(fetchEditorComponentsRoutine.trigger({ appId: payload.appId }));
  } catch (error) {
    yield put(updateComponentRoutine.failure(error));
  }
}

function* watchUpdateComponent() {
  yield takeEvery(updateComponentRoutine.TRIGGER, updateComponent);
}

export default function* appSaga() {
  yield all([
    watchAddApp(),
    watchFetchApps(),
    watchAppsEdit(),
    watchFetchSelectApp(),
    watchFetchComponents(),
    watchAddComponent(),
    watchUpdateComponent()
  ]);
}
