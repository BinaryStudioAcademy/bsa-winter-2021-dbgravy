import { useHistory: TUseHistory } from '@types/react-router-dom';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { Routine } from 'redux-saga-routines';
import { Routes } from '../../../common/enums/Routes';
import TResource from '../../../common/models/types/TResource';
// import { IResponseError } from '../../../common/models/fetch/IResponseError';

import {
  testConnectionRoutine,
  createResourceRoutine,
  updateResourceRoutine,
  getResourceByIdRoutine,
  getResourcesRoutine
} from '../routines/inedex';

import {
  getResources,
  getResourceById,
  testConnection,
  createResource,
  updateResource
  // deleteResource
} from '../../../services/resourceService';

interface IPush {
  push: RouteComponentProps
}

const { push }: IPush = useHistory();

function* testConnectionRequest({ payload }: Routine<any>) {
  try {
    yield call(testConnection, payload);
    yield put(testConnectionRoutine.success());
  } catch (error) {
    // yield call(toastrError, error.message);
    // yield put(testConnectionRoutine.failure(error.message));
  }
}

function* watchTestConnectionRequest() {
  yield takeEvery(testConnectionRoutine.TRIGGER, testConnectionRequest);
}

function* createResourceRequest({ payload }: Routine<any>) {
  try {
    const resource: TResource = yield call(createResource, payload);
    yield put(push(Routes.Resources));
    yield put(createResourceRoutine.success(resource));
  } catch (error) {
    // yield call(toastrError, error.message);
    // yield put(createResourceRoutine.failure(error.message));
  }
}

function* watchCreateResourceRequest() {
  yield takeEvery(createResourceRoutine.TRIGGER, createResourceRequest);
}

function* updateResourceRequest({ payload }: Routine<any>) {
  try {
    const resource: TResource = yield call(updateResource, payload);
    yield put(push(Routes.Resources));
    yield put(updateResourceRoutine.success(resource));
  } catch (error) {
    // yield call(toastrError, error.message);
    // yield put(updateResourceRoutine.failure(error.message));
  }
}

function* watchUpdateResourceRequest() {
  yield takeEvery(updateResourceRoutine.TRIGGER, updateResourceRequest);
}

function* getResourceByIdRequest({ payload }: Routine<any>) {
  try {
    const resource: TResource = yield call(getResourceById, payload);
    yield put(push(Routes.Resources));
    yield put(getResourceByIdRoutine.success(resource));
  } catch (error) {
    // yield call(toastrError, error.message);
    // yield put(getResourceByIdRoutine.failure(error.message));
  }
}

function* watchGetResourceByIdRequest() {
  yield takeEvery(getResourceByIdRoutine.TRIGGER, getResourceByIdRequest);
}

function* getResourcesRequest() {
  try {
    const resource: Array<TResource> = yield call(getResources);
    yield put(push(Routes.Resources));
    yield put(getResourcesRoutine.success(resource));
  } catch (error) {
    // yield call(toastrError, error.message);
    // yield put(getResourcesRoutine.failure(error.message));
  }
}

function* watchGetResourcesRequest() {
  yield takeEvery(getResourcesRoutine.TRIGGER, getResourcesRequest);
}

export default function* resourcesSagas() {
  [
    watchTestConnectionRequest(),
    watchCreateResourceRequest(),
    watchUpdateResourceRequest(),
    watchGetResourceByIdRequest(),
    watchGetResourcesRequest()
  ]
};
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { fetchResourceRoutine } from '../routines';
import * as resourceService from '../../../services/resourceService';

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

export default function* resourceSaga() {
  yield all([
    watchFetchResources()
  ]);
}
