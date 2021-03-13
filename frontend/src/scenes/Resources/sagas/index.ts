import { all, put, call, takeEvery, select } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { deleteResourceRoutine, editResourseRoutine, fetchResourceRoutine } from '../routines';
import * as resourceService from '../../../services/resourceService';
import { IAppState } from '../../../common/models/store/IAppState';

function* fetchResources(): Routine<any> {
  try {
    const resources = yield call(resourceService.getResources);
    yield put(fetchResourceRoutine.success(resources));
  } catch (error) {
    console.log('getResource error:', error.message);
  }
}

function* watchFetchResources() {
  yield takeEvery(fetchResourceRoutine.TRIGGER, fetchResources);
}

const selector = (state: IAppState) => state.resource.editResource;

function* deleteResource() {
  const { resource } = yield select(selector);
  try {
    yield call(resourceService.delResource, resource.id);
    yield put(deleteResourceRoutine.success());
  } catch {
    yield put(deleteResourceRoutine.failure(resource));
  }
}

function* editResource() {
  const { resource, updated } = yield select(selector);
  try {
    yield call(resourceService.updateResource, resource.id, updated);
    yield put(deleteResourceRoutine.success());
  } catch {
    yield put(deleteResourceRoutine.failure({ resource, updated }));
  }
}

function* watchEditResource() {
  yield takeEvery(deleteResourceRoutine.TRIGGER, deleteResource);
  yield takeEvery(editResourseRoutine.TRIGGER, editResource);
}

export default function* resourceSaga() {
  yield all([
    watchFetchResources(),
    watchEditResource()
  ]);
}
