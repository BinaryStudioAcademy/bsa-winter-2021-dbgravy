import { all, put, call, takeEvery, select } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import {
  fetchResourceRoutine,
  getResourceByIdRoutine,
  createResourceRoutine,
  updateResourceRoutine,
  testResourceRoutine,
  deleteResourceRoutine
} from '../routines';
import * as resourceService from '../../../services/resourceService';
import { IAppState } from '../../../common/models/store/IAppState';
import { fetchQueryRoutine, setResourcesRoutine } from '../../constructor/routines';
import { successToastMessage, errorToastMessage } from '../../../common/helpers/toastMessageHelper';

function* fetchResources({ payload } : Routine<any>): Routine<any> {
  try {
    const resources = yield call(resourceService.getResources);
    yield put(fetchResourceRoutine.success(resources));
    yield put(setResourcesRoutine.trigger(resources));
    if (payload) {
      yield put(fetchQueryRoutine.trigger({ id: payload.id }));
    }
  } catch (error) {
    yield put(fetchResourceRoutine.failure(error.message));
    errorToastMessage(error.message);
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
    errorToastMessage(error.message);
  }
}

function* watchGetResource() {
  yield takeEvery(getResourceByIdRoutine.TRIGGER, getResource);
}

function* addResource({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(resourceService.addResource, payload);
    yield put(fetchResourceRoutine.trigger());
    successToastMessage('Resource added successfully');
  } catch (error) {
    yield put(createResourceRoutine.failure(error.message));
    errorToastMessage(error.message);
  }
}

function* watchAddResource() {
  yield takeEvery(createResourceRoutine.TRIGGER, addResource);
}

function* testResource({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(resourceService.testResource, payload);
    yield put(testResourceRoutine.success());
    successToastMessage('Test connect success');
  } catch (error) {
    yield put(testResourceRoutine.failure(error.message));
    errorToastMessage(error.message);
  }
}

function* watchTestResource() {
  yield takeEvery(testResourceRoutine.TRIGGER, testResource);
}

function* updateResource({ payload }: Routine<any>): Routine<any> {
  try {
    yield call(resourceService.updateResource, payload);
    yield put(fetchResourceRoutine.trigger());
    successToastMessage('Resource updated successfully');
  } catch (error) {
    yield put(updateResourceRoutine.failure());
    errorToastMessage(error.message);
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
    successToastMessage('Resource deleted successfully');
  } catch (error) {
    yield put(deleteResourceRoutine.failure(error.message));
    errorToastMessage(error.message);
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
