import { all } from 'redux-saga/effects';
import appSaga from '../scenes/Apps/sagas';

export default function* rootSaga() {
  yield all([
    appSaga()
  ]);
}
