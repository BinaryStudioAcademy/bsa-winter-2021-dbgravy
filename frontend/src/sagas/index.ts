import { all } from 'redux-saga/effects';
import appSaga from '../scenes/Apps/sagas';
import userSaga from '../scenes/Auth/sagas';
import settingSaga from '../scenes/Settings/sagas';
import organizationUserSaga from './userOrganizationSaga';

export default function* rootSaga() {
  yield all([
    settingSaga(),
    appSaga(),
    userSaga(),
    organizationUserSaga()
  ]);
}
