import { all } from 'redux-saga/effects';
import appSaga from '../scenes/Applications/sagas';

export default function* rootSaga() {
  yield all([
    appSaga()
  ]);
}
