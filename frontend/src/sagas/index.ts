import { all } from 'redux-saga/effects';
import applicationRootSaga from './applicationRootSaga';
import resourceSaga from '../scenes/Resources/sagas';
import userSaga from '../scenes/Auth/sagas';
import settingSaga from '../scenes/Settings/sagas';
import organizationUserSaga from '../containers/ProfilePopup/sagas';

export default function* rootSaga() {
  yield all([
    settingSaga(),
    applicationRootSaga(),
    userSaga(),
    organizationUserSaga(),
    resourceSaga()
  ]);
}
