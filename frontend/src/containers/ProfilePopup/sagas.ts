import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import { IAppState } from '../../common/models/store/IAppState';
import { IUser } from '../../common/models/user/IUser';
import { IUserOrganization } from '../../common/models/user/IUserOrganization';
import {
  fetchOrganization,
  postCreateOrganization,
  fetchOrganizations,
  changeCurrentUserOrganization
} from '../../services/userService';
import {
  fetchOrgInfoRoutine,
  createOrganizationRoutine,
  fetchUserOrganizationsRoutine,
  changeUserOrganizationRoutine } from './routines';
import { logotUserRoutine } from '../../scenes/Auth/routines';
import { removeToken } from '../../services/authService';
import { clearStorage, getRefreshToken } from '../../common/helpers/storageHelper';
import { Routine } from 'redux-saga-routines';

function* watchFetchUserOrganization() {
  yield takeEvery(fetchOrgInfoRoutine.TRIGGER, fetchUserOrganization);
}

const selectUser = (state: IAppState) => state.user.user;

function* fetchUserOrganization() {
  const user: IUser = yield select(selectUser);
  try {
    const response: IUserOrganization = yield call(
      fetchOrganization, user.id || '', user.organizationId || ''
    );
    yield put(fetchOrgInfoRoutine.success({ currentOrganization: response }));
  } catch {
    yield put(fetchOrgInfoRoutine.failure());
  }
}

function* fetchUserOrganizations() {
  try {
    const response: IUserOrganization = yield call(fetchOrganizations);
    yield put(fetchUserOrganizationsRoutine.success(response));
  } catch {
    yield put(fetchUserOrganizationsRoutine.failure());
  }
}

function* watchCreateOrganization() {
  yield takeEvery(createOrganizationRoutine.REQUEST, createOrganization);
}

function* createOrganization() {
  const user: IUser = yield select(selectUser);
  try {
    const { newOrganization, id: createdByUserId } = yield select(selectUser);
    const response: { result: boolean } = yield call(
      postCreateOrganization, { name: newOrganization.name, createdByUserId }
    );

    if (response.result) {
      yield put(createOrganizationRoutine.success({ user }));
    } else {
      yield put(createOrganizationRoutine.failure({ user }));
    }
  } catch {
    yield put(createOrganizationRoutine.failure({ user }));
  }
}

function* changeUserOrganization({ payload }: Routine<any>): Routine<any> {
  try {
    const response: IUserOrganization = yield call(changeCurrentUserOrganization, payload);
    yield put(changeUserOrganizationRoutine.success(response));
  } catch {
    yield put(changeUserOrganizationRoutine.failure());
  }
}

function* logout() {
  const token = getRefreshToken();
  try {
    yield removeToken(token);
    yield call(clearStorage);
    yield put(logotUserRoutine.success());
  } catch {
    yield call(clearStorage);
    yield put(logotUserRoutine.success());
  }
}

function* watchLogout() {
  yield takeEvery(logotUserRoutine.TRIGGER, logout);
}

function* watchFetchUserOrganizations() {
  yield takeEvery(fetchUserOrganizationsRoutine.TRIGGER, fetchUserOrganizations);
}

function* watchChangeUserOrganization() {
  yield takeEvery(changeUserOrganizationRoutine.TRIGGER, changeUserOrganization);
}

export default function* organizationUserSaga() {
  yield all([
    watchFetchUserOrganization(),
    watchFetchUserOrganizations(),
    watchCreateOrganization(),
    watchChangeUserOrganization(),
    watchLogout()
  ]);
}
