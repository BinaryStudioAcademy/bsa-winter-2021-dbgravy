import { all } from 'redux-saga/effects';
import appSaga from '../scenes/Apps/sagas';
import resourceSaga from '../scenes/Resources/sagas';
import settingSaga from '../scenes/Settings/sagas';

export default function* rootSaga() {
  yield all([
    settingSaga(),
    appSaga(),
    resourceSaga()
  ]);
}
