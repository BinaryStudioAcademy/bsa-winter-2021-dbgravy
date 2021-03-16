import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import { IUser } from '../../../common/models/user/IUser';
import {
  fetchUsersRoutine,
  inviteNewUserRoutine,
  reinviteUserRoutine,
  userActivationRoutine,
  modalShowRoutine,
  inviteUserToOrganizationRoutine,
  switchUserToOrganizationRoutine
} from '../routines/index';
import {
  fetchUsers,
  sendInvite,
  putUserChanges,
  resendInvite,
  checkInvite,
  switchUser
} from '../../../services/settingsService';
import { IAppState } from '../../../common/models/store/IAppState';
import { Status } from '../../../common/enums/UserStatus';
import { Routine } from 'redux-saga-routines';

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
  const { id: organizationId } = yield select(selectOrgId);
  const { userChanges } = yield select(selectUser);
  const { role, email } = userChanges;
  try {
    if (!userChanges.new) {
      const response: IUser = yield call(resendInvite, { email, organizationId });
      yield put(reinviteUserRoutine.success(response));
    } else {
      const response: IUser = yield call(sendInvite, { email, role, organizationId, status: Status.Pending });
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
  const { id: organizationId } = yield select(selectOrgId);
  try {
    const { userChanges } = yield select(selectUser);
    const { id, status } = userChanges;
    const response: IUser = yield call(putUserChanges, { userId: id, status, organizationId });
    yield put(userActivationRoutine.success(response));
  } catch {
    yield put(userActivationRoutine.failure());
  }
}

function* checkInviteUserToOrganization({ payload }: Routine<any>): Routine<any> {
  try {
    const response = yield call(checkInvite, payload);
    yield put(inviteUserToOrganizationRoutine.success(response));
  } catch {
    yield put(inviteUserToOrganizationRoutine.failure());
  }
}

function* switchUserToOrganization({ payload }: Routine<any>): Routine<any> {
  try {
    const response = yield call(switchUser, payload);
    yield put(switchUserToOrganizationRoutine.success(response));
    yield put(inviteUserToOrganizationRoutine.failure());
  } catch {
    yield put(switchUserToOrganizationRoutine.failure());
  }
}

function* watchInviteUserToOrganization() {
  yield takeEvery(inviteUserToOrganizationRoutine.TRIGGER, checkInviteUserToOrganization);
}

function* watchSwitchUserToOrganization() {
  yield takeEvery(switchUserToOrganizationRoutine.TRIGGER, switchUserToOrganization);
}

export default function* settingsSaga() {
  yield all([
    watchFetchUsers(),
    watchInviteUser(),
    watchUserActivation(),
    watchInviteUserToOrganization(),
    watchSwitchUserToOrganization()
  ]);
}
