import { all } from 'redux-saga/effects';
import appSaga from '../scenes/Apps/sagas';
import settingSaga from '../scenes/Settings/sagas';
import resourcesSagas from '../scenes/Resources/sagas';

export default function* rootSaga() {
  yield all([
    settingSaga(),
    appSaga(),
    resourcesSagas()
  ]);
}
