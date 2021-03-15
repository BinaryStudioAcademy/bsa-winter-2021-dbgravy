import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import {
  fetchResourceRoutine,
  getResourceByIdRoutine,
  createResourceRoutine,
  updateResourceRoutine,
  testResourceRoitine
  // deleteResourceRoutine
} from '../routines/index';
import * as resourceService from '../../../services/resourceService';
// import { IAppState } from '../../../common/models/store/IAppState';

function* fetchResources(): Routine<any> {
  try {
    const resources = yield call(resourceService.getResources);
    yield put(fetchResourceRoutine.success(resources));
  } catch (error) {
    yield put(fetchResourceRoutine.failure(error.message));
  }
}

function* watchFetchResources() {
  yield takeEvery(fetchResourceRoutine.TRIGGER, fetchResources);
}

// <<<<<<< HEAD
function* getResource({ payload }: Routine<any>): Routine<any> {
  try {
    const resource = yield call(resourceService.getResourceById, payload);
    yield put(getResourceByIdRoutine.success(resource));
  } catch (error) {
    console.log('getResource error:', error.message);
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
    console.log('addResource error:', error.message);
  }
}

function* watchAddResource() {
  yield takeEvery(createResourceRoutine.TRIGGER, addResource);
}

function* testResource({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(resourceService.testResource, payload);
    yield put(testResourceRoitine.success());
  } catch (error) {
    yield put(testResourceRoitine.failure());
  }
}

function* watchTestResource() {
  yield takeEvery(testResourceRoitine.TRIGGER, testResource);
}

function* updateResource({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(resourceService.updateResource, payload);
    yield put(fetchResourceRoutine.trigger());
  } catch (error) {
    console.log('editResource error:', error.message);
  }
}

function* watchUpdateResource() {
  yield takeEvery(updateResourceRoutine.TRIGGER, updateResource);
  // =======
  // const selector = (state: IAppState) => state.resource.editResource;

  // function* deleteResource() {
  //   const { resource } = yield select(selector);
  //   try {
  //     yield call(resourceService.delResource, resource.id);
  //     yield put(deleteResourceRoutine.success());
  //     yield put(fetchResourceRoutine.trigger());
  //   } catch {
  //     yield put(watchEditResource.failure(resource));
  //   }
  // }

  // function* editResource() {
  //   const { resource, updated } = yield select(selector);
  //   try {
  //     yield call(resourceService.updateResource, resource.id, updated);
  //     yield put(deleteResourceRoutine.success());
  //   } catch {
  //     yield put(deleteResourceRoutine.failure({ resource, updated }));
  //   }
  // }

  // function* watchEditResource() {
  //   yield takeEvery(deleteResourceRoutine.TRIGGER, deleteResource);
  //   yield takeEvery(editResourseRoutine.REQUEST, editResource);
  // >>>>>>> dev
}

export default function* resourceSaga() {
  yield all([
    watchFetchResources(),
    watchGetResource(),
    watchUpdateResource(),
    watchAddResource(),
    watchTestResource()
  ]);
}
