import { all } from 'redux-saga/effects';

import settingSaga from '../scenes/Settings/sagas';

export default function* rootSaga() {
  yield all([
    settingSaga()
  ]);
}
