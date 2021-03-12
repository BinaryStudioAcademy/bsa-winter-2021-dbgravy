import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import {
  fetchResourceRoutine,
  getResourceByIdRoutine,
  createResourceRoutine,
  updateResourceRoutine
} from '../routines/index';
import * as resourceService from '../../../services/resourceService';

function* fetchResources(): Routine<any> {
  try {
    const resources = yield call(resourceService.getResources);
    yield put(fetchResourceRoutine.success(resources));
  } catch (error) {
    console.log('getResources error:', error.message);
  }
}

function* watchFetchResources() {
  yield takeEvery(fetchResourceRoutine.TRIGGER, fetchResources);
}

function* getResource({ payload }: Routine<any>): Routine<any> {
  try {
    const resources = yield call(resourceService.getResourceById, payload);
    yield put(fetchResourceRoutine.success(resources));
  } catch (error) {
    console.log('getResource error:', error.message);
  }
}

function* watchGetResource() {
  yield takeEvery(getResourceByIdRoutine.TRIGGER, getResource);
}

function* addResource({ payload }: Routine<any>): Routine<any> {
  try {
    console.log(payload);
    const resources = yield call(resourceService.addResource, payload);
    yield put(fetchResourceRoutine.success(resources));
  } catch (error) {
    console.log('addResource error:', error.message);
  }
}

function* watchAddResource() {
  yield takeEvery(createResourceRoutine.TRIGGER, addResource);
}

function* updateResource({ payload }: Routine<any>): Routine<any> {
  try {
    const resources = yield call(resourceService.updateResource, payload);
    yield put(fetchResourceRoutine.success(resources));
  } catch (error) {
    console.log('editResource error:', error.message);
  }
}

function* watchUpdateResource() {
  yield takeEvery(updateResourceRoutine.TRIGGER, updateResource);
}

export default function* resourceSaga() {
  yield all([
    watchFetchResources(),
    watchGetResource(),
    watchUpdateResource(),
    watchAddResource()
  ]);
}
