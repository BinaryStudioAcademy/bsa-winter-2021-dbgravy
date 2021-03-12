import { all, put, call, takeEvery, select } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import TResource from '../../../common/models/types/TResource';
import { resources } from './selectors';

// import { Routes } from '../../../common/enums/Routes';
// import { /* useHistory, */ RouteComponentProps } from 'react-router-dom';
// import { useHistory } from '@types/react-router-dom';

import {
  testConnectionRoutine,
  createResourceRoutine,
  updateResourceRoutine,
  getResourceByIdRoutine,
  fetchResourceRoutine,
  deleteResourceByIdRoutine
} from '../routines';

import {
  getResources,
  getResourceById,
  testConnection,
  createResource,
  updateResource,
  deleteResource
} from '../../../services/resourceService';

/*
interface IPush {
  push: RouteComponentProps
}
*/

// const { push }: IPush = useHistory();

function* deleteResourceByIdRequest({ payload }: Routine<any>) {
  try {
    yield call(deleteResource, payload);
    const oldResources: Array<TResource> = yield select(resources);
    const updated = oldResources.filter(oldResource => (oldResource.id !== payload));
    yield put(deleteResourceByIdRoutine.success(updated));
  } catch (error) {
    // eslint-disable-next-line
    console.log('testConnection error:', error.message);
  }
}

function* watchDeleteResourceByIdRequest() {
  yield takeEvery(deleteResourceByIdRoutine.TRIGGER, deleteResourceByIdRequest);
}

function* testConnectionRequest({ payload }: Routine<any>) {
  try {
    yield call(testConnection, payload);
    yield put(testConnectionRoutine.success());
  } catch (error) {
    // eslint-disable-next-line
    console.log('testConnection error:', error.message);
  }
}

function* watchTestConnectionRequest() {
  yield takeEvery(testConnectionRoutine.TRIGGER, testConnectionRequest);
}

function* createResourceRequest({ payload }: Routine<any>) {
  try {
    const resource: TResource = yield call(createResource, payload);
    const oldResources: Array<TResource> = yield select(resources);
    // yield put(push(Routes.Resources));
    yield put(createResourceRoutine.success([resource, ...oldResources]));
  } catch (error) {
    // eslint-disable-next-line
    console.log('createResource error:', error.message);
  }
}

function* watchCreateResourceRequest() {
  yield takeEvery(createResourceRoutine.TRIGGER, createResourceRequest);
}

function* updateResourceRequest({ payload }: Routine<any>) {
  try {
    const resource: TResource = yield call(updateResource, payload);
    const oldResources: Array<TResource> = yield select(resources);
    const updated = oldResources.map(oldResourse => (oldResourse.id !== resource.id ? oldResourse : resource));
    // yield put(push(Routes.Resources));
    yield put(updateResourceRoutine.success(updated));
  } catch (error) {
    // eslint-disable-next-line
    console.log('updateResource error:', error.message);
  }
}

function* watchUpdateResourceRequest() {
  yield takeEvery(updateResourceRoutine.TRIGGER, updateResourceRequest);
}

function* getResourceByIdRequest({ payload }: Routine<any>) {
  try {
    const resource: TResource = yield call(getResourceById, payload);
    // yield put(push(Routes.Resources));
    yield put(getResourceByIdRoutine.success(resource));
  } catch (error) {
    // eslint-disable-next-line
    console.log('getResourceById error:', error.message);
  }
}

function* watchGetResourceByIdRequest() {
  yield takeEvery(getResourceByIdRoutine.TRIGGER, getResourceByIdRequest);
}

function* fetchResources(): Routine<any> {
  try {
    const resourcesNew = yield call(getResources);
    yield put((resourcesNew));
  } catch (error) {
    // eslint-disable-next-line
    console.log('getResource error:', error.message);
  }
}

function* watchFetchResources() {
  yield takeEvery(fetchResourceRoutine.TRIGGER, fetchResources);
}

export default function* resourcesSagas() {
  yield all([
    watchTestConnectionRequest(),
    watchCreateResourceRequest(),
    watchUpdateResourceRequest(),
    watchGetResourceByIdRequest(),
    watchFetchResources(),
    watchDeleteResourceByIdRequest()
  ]);
}
