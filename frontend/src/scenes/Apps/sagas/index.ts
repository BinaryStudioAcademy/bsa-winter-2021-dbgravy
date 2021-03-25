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
  updateComponentRoutine,
  localUpdateComponentRoutine,
  deleteComponentRoutine
} from '../routines';
import * as appService from '../../../services/applicationService';
import { IAppState } from '../../../common/models/store/IAppState';
import { IApps } from '../../../common/models/apps/IApps';
import { IDropItem } from '../../../common/models/editor/IDropItem';
import { successToastMessage, errorToastMessage } from '../../../common/helpers/toastMessageHelper';

function* fetchApps(): Routine<any> {
  try {
    const apps = yield call(appService.getApps);
    yield put(fetchAppRoutine.success(apps));
  } catch (error) {
    yield put(fetchAppRoutine.failure(error));
    errorToastMessage(error.msg);
  }
}

function* watchFetchApps() {
  yield takeEvery(fetchAppRoutine.TRIGGER, fetchApps);
}

function* addApp({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(appService.addApp, payload);
    yield put(fetchAppRoutine.trigger());
    successToastMessage('App added successfully');
  } catch (error) {
    yield put(addAppRoutine.failure(error));
    errorToastMessage(error.msg);
  }
}

const selectApp = (state: IAppState) => state.app.application.editedApp;

function* deleteApp() {
  const { app } = yield select(selectApp);
  try {
    yield call(appService.deleteApp, app);
    yield put(deleteAppRoutine.success());
    yield put(fetchAppRoutine.trigger());
    successToastMessage('App deleted successfully');
  } catch (error) {
    yield put(deleteAppRoutine.failure({ app }));
    errorToastMessage(error.msg);
  }
}

function* editApp() {
  const { app, name } = yield select(selectApp);
  try {
    const response: IApps = yield call(appService.editApp, app, { name });
    yield put(editAppRoutine.success(response));
    yield put(fetchSelectAppRoutine.success(response));
    yield put(showEditRoutine.trigger(false));
    successToastMessage('App edited successfully');
  } catch (error) {
    yield put(editAppRoutine.failure({ app }));
    errorToastMessage(error.msg);
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
    const components: { [key: string]: IDropItem } = yield call(appService.getComponents, payload.appId);
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

function* localUpdateComponent({ payload }: Routine<any>) {
  yield put(localUpdateComponentRoutine.success({ component: payload.component }));
}

function* watchLocalUpdateComponent() {
  yield takeEvery(localUpdateComponentRoutine.TRIGGER, localUpdateComponent);
}

function* deleteComponent({ payload }: Routine<any>) {
  try {
    yield call(appService.deleteComponent, payload);
    yield put(fetchEditorComponentsRoutine.trigger({ appId: payload.appId }));
  } catch (error) {
    yield put(deleteComponentRoutine.failure(error));
  }
}

function* watchDeleteComponent() {
  yield takeEvery(deleteComponentRoutine.TRIGGER, deleteComponent);
}

export default function* appSaga() {
  yield all([
    watchAddApp(),
    watchFetchApps(),
    watchAppsEdit(),
    watchFetchSelectApp(),
    watchFetchComponents(),
    watchAddComponent(),
    watchUpdateComponent(),
    watchLocalUpdateComponent(),
    watchDeleteComponent()
  ]);
}
