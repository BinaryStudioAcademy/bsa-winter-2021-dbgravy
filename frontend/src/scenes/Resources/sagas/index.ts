import { all, put, call, takeEvery, select } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import {
  fetchResourceRoutine,
  getResourceByIdRoutine,
  createResourceRoutine,
  updateResourceRoutine,
  testResourceRoutine,
  deleteResourceRoutine
} from '../routines/index';
import * as resourceService from '../../../services/resourceService';
import { IAppState } from '../../../common/models/store/IAppState';
import { setResourcesRoutine } from '../../constructor/routines';

function* fetchResources(): Routine<any> {
  try {
    const resources = yield call(resourceService.getResources);
    yield put(fetchResourceRoutine.success(resources));
    yield put(setResourcesRoutine.trigger(resources));
  } catch (error) {
    yield put(fetchResourceRoutine.failure(error.message));
  }
}

function* watchFetchResources() {
  yield takeEvery(fetchResourceRoutine.TRIGGER, fetchResources);
}

function* getResource({ payload }: Routine<any>): Routine<any> {
  try {
    const resource = yield call(resourceService.getResourceById, payload);
    yield put(getResourceByIdRoutine.success(resource));
  } catch (error) {
    yield put(getResourceByIdRoutine.failure(error.message));
  }
}

function* watchGetResource() {
  yield takeEvery(getResourceByIdRoutine.TRIGGER, getResource);
}

function* addResource({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(resourceService.addResource, payload);
    yield put(fetchResourceRoutine.trigger());
  } catch (error) {
    yield put(createResourceRoutine.failure(error.message));
  }
}

function* watchAddResource() {
  yield takeEvery(createResourceRoutine.TRIGGER, addResource);
}

function* testResource({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(resourceService.testResource, payload);
    yield put(testResourceRoutine.success());
  } catch (error) {
    yield put(testResourceRoutine.failure(error.message));
  }
}

function* watchTestResource() {
  yield takeEvery(testResourceRoutine.TRIGGER, testResource);
}

function* updateResource({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(resourceService.updateResource, payload);
    yield put(fetchResourceRoutine.trigger());
  } catch (error) {
    yield put(updateResourceRoutine.failure());
  }
}

function* watchUpdateResource() {
  yield takeEvery(updateResourceRoutine.TRIGGER, updateResource);
}

const selector = (state: IAppState) => state.resource.resource;

function* deleteResource() {
  const { resource } = yield select(selector);
  try {
    yield call(resourceService.delResource, resource.id);
    yield put(fetchResourceRoutine.trigger());
  } catch (error) {
    yield put(deleteResourceRoutine.failure(error.message));
  }
}

function* watchDeleteResource() {
  yield takeEvery(deleteResourceRoutine.TRIGGER, deleteResource);
}

export default function* resourceSaga() {
  yield all([
    watchFetchResources(),
    watchGetResource(),
    watchUpdateResource(),
    watchAddResource(),
    watchTestResource(),
    watchDeleteResource()
  ]);
}
