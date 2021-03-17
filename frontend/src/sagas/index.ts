import { all } from 'redux-saga/effects';
import appSaga from '../scenes/Apps/sagas';
import resourceSaga from '../scenes/Resources/sagas';
import userSaga from '../scenes/Auth/sagas';
import settingSaga from '../scenes/Settings/sagas';
import organizationUserSaga from '../containers/ProfilePopup/sagas';
import querySaga from '../components/Preview/saga';

export default function* rootSaga() {
  yield all([
    settingSaga(),
    appSaga(),
    userSaga(),
    organizationUserSaga(),
    resourceSaga(),
    querySaga()
  ]);
}
