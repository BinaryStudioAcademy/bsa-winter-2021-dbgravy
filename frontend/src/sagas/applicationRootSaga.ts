import { all } from 'redux-saga/effects';
import appSaga from '../scenes/Apps/sagas';
import querySaga from '../scenes/constructor/sagas';

export default function* applicationRootSaga() {
  yield all([
    appSaga(),
    querySaga()
  ]);
}
