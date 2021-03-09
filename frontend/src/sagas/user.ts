import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import { IAppState } from '../common/models/store/IAppState';
import { IUserOrganization } from '../common/models/user/IUserOrganization';
import { fetchOrganization, postCreateOrganization } from '../services/userService';
import { fetchOrgInfoRoutine, createOrganizationRoutine } from '../containers/ProfilePopup/routines/index';

function* watchFetchUserOrganization() {
  yield takeEvery(fetchOrgInfoRoutine.TRIGGER, fetchUserOrganization);
}

const selectUser = (state: IAppState) => state.user;

function* fetchUserOrganization() {
  try {
    const { organizationId, id: userId } = yield select(selectUser);
    const response: IUserOrganization = yield call(fetchOrganization, { organizationId, userId });
    yield put(fetchOrgInfoRoutine.success(response));
  } catch {
    //
  }
}

function* watchCreateOrganization() {
  yield takeEvery(createOrganizationRoutine.TRIGGER, createOrganization);
}

function* createOrganization() {
  try {
    const { newOrganization } = yield select(selectUser);
    const response: {created: boolean} = yield call(postCreateOrganization, newOrganization);
    yield put(createOrganizationRoutine.success(response));
  } catch {
    //
  }
}

export default function* userSaga() {
  yield all([
    watchFetchUserOrganization(),
    watchCreateOrganization()
  ]);
}
