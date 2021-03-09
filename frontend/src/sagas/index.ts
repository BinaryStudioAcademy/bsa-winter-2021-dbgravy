import { all } from 'redux-saga/effects';
import appSaga from '../scenes/Apps/sagas';
import settingSaga from '../scenes/Settings/sagas';
import userSaga from './user';

export default function* rootSaga() {
  yield all([
    settingSaga(),
    appSaga(),
    userSaga()
  ]);
}
