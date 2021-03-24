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
import { errorToastMessage } from '../../common/helpers/toastMessageHelper';
import { fetchAppRoutine } from '../../scenes/Apps/routines';
import { fetchResourceRoutine } from '../../scenes/Resources/routines';

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
  } catch (error) {
    yield put(fetchOrgInfoRoutine.failure());
    errorToastMessage(error.msg);
  }
}

function* fetchUserOrganizations() {
  try {
    const response: IUserOrganization = yield call(fetchOrganizations);
    yield put(fetchUserOrganizationsRoutine.success(response));
  } catch (error) {
    yield put(fetchUserOrganizationsRoutine.failure());
    errorToastMessage(error.msg);
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
  } catch (error) {
    yield put(createOrganizationRoutine.failure({ user }));
    errorToastMessage(error.msg);
  }
}

function* changeUserOrganization({ payload }: Routine<any>): Routine<any> {
  try {
    const response: IUserOrganization = yield call(changeCurrentUserOrganization, payload);
    yield put(changeUserOrganizationRoutine.success(response));
    yield put(fetchAppRoutine.trigger());
    yield put(fetchResourceRoutine.trigger());
  } catch (error) {
    yield put(changeUserOrganizationRoutine.failure());
    errorToastMessage(error.msg);
  }
}

function* logout() {
  const token = getRefreshToken();
  try {
    yield removeToken(token);
    yield call(clearStorage);
    yield put(logotUserRoutine.success());
  } catch (error) {
    yield call(clearStorage);
    yield put(logotUserRoutine.success());
    errorToastMessage(error.msg);
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
