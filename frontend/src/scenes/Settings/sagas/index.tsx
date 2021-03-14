import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import { IUser } from '../../../common/models/user/IUser';
import {
  fetchUsersRoutine,
  inviteNewUserRoutine,
  reinviteUserRoutine,
  userActivationRoutine,
  modalShowRoutine
} from '../routines/index';
import { fetchUsers, sendInvite, putUserChanges, resendInvite } from '../../../services/settingsService';
import { IAppState } from '../../../common/models/store/IAppState';
import { Status } from '../../../common/enums/UserStatus';

function* watchFetchUsers() {
  yield takeEvery(fetchUsersRoutine.TRIGGER, fetchUsersList);
}
const selectOrgId = (state: IAppState) => state.user.currentOrganization;
const selectUser = (state: IAppState) => state.settings;

function* fetchUsersList() {
  try {
    const { id } = yield select(selectOrgId);
    const response: IUser[] = yield call(fetchUsers, id);
    yield put(fetchUsersRoutine.success(response));
  } catch {
    yield put(fetchUsersRoutine.failure());
  }
}

function* watchInviteUser() {
  yield takeEvery(inviteNewUserRoutine.TRIGGER, sendUserInvite);
  yield takeEvery(reinviteUserRoutine, sendUserInvite);
}

function* sendUserInvite() {
  // Not implemented
  // const { organizationId } = select(selectOrgId);
  const { userChanges } = yield select(selectUser);
  const { role, email } = userChanges;
  try {
    if (!userChanges.new) {
      const response: IUser = yield call(resendInvite, { email, organizationId: '1' });
      yield put(reinviteUserRoutine.success(response));
    } else {
      const response: IUser = yield call(sendInvite, { email, role, organizationId: '1', status: Status.Pending });
      yield put(inviteNewUserRoutine.success(response));
      yield put(modalShowRoutine.success());
    }
  } catch {
    if (!userChanges.new) {
      yield put(reinviteUserRoutine.failure());
    } else {
      yield put(inviteNewUserRoutine.failure());
      yield put(modalShowRoutine.failure());
    }
  }
}

function* watchUserActivation() {
  yield takeEvery(userActivationRoutine.TRIGGER, toggleUserActivation);
}

function* toggleUserActivation() {
  // Not implemented
  // const { organizationId } = select(selectOrgId);
  try {
    const { userChanges } = yield select(selectUser);
    const { id, status } = userChanges;
    const response: IUser = yield call(putUserChanges, { userId: id, status, organizationId: '1' });
    yield put(userActivationRoutine.success(response));
  } catch {
    yield put(userActivationRoutine.failure());
  }
}

export default function* settingsSaga() {
  yield all([
    watchFetchUsers(),
    watchInviteUser(),
    watchUserActivation()
  ]);
}
