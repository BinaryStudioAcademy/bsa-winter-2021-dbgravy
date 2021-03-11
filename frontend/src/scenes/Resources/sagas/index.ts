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
