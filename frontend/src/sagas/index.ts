import { all } from 'redux-saga/effects';
import appSaga from '../scenes/Apps/sagas';
import userSaga from '../scenes/Auth/sagas';

export default function* rootSaga() {
  yield all([
    appSaga(),
    userSaga()
  ]);
}
