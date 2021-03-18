import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import {
  fetchUserRoutine,
  addNewUserRoutine,
  loginUserRoutine,
  forgotPasswordRoutine,
  resetPasswordRoutine
} from '../routines';
import {
  registration,
  login,
  fetchUser,
  forgotPassword
  // resetPassword
} from '../../../services/authService';
import { inviteUserToOrganizationRoutine } from '../../Settings/routines';
import { IAuthServerResponse } from '../../../common/models/auth/AuthServerResponse';
import { IUser } from '../../../common/models/user/IUser';
import { setTokens, clearStorage } from '../../../common/helpers/storageHelper';
import { errorHelper } from '../../../common/helpers/errorHelper';

function* fetchUserRequest() {
  try {
    const user: IUser = yield call(fetchUser);
    yield put(fetchUserRoutine.success(user));
  } catch (error) {
    yield call(clearStorage);
    yield put(fetchUserRoutine.failure(error.message));
  }
}

function* watchUserRequest() {
  yield takeEvery(fetchUserRoutine.TRIGGER, fetchUserRequest);
}

function* loginUserRequest({ payload }: Routine<any>) {
  try {
    const { accessToken, refreshToken, user }: IAuthServerResponse = yield call(login, payload);
    setTokens({ accessToken, refreshToken });
    yield put(loginUserRoutine.success(user));
    yield put(inviteUserToOrganizationRoutine.failure());
  } catch (error) {
    yield put(loginUserRoutine.failure(error.message));
  }
}

function* watchLoginUserRequest() {
  yield takeEvery(loginUserRoutine.TRIGGER, loginUserRequest);
}

function* addNewUserRequest({ payload }: any): Routine<any> {
  try {
    const { accessToken, refreshToken, user }: IAuthServerResponse = yield call(registration, payload);
    setTokens({ accessToken, refreshToken });
    yield put(addNewUserRoutine.success(user));
    yield put(inviteUserToOrganizationRoutine.failure());
  } catch (error) {
    const message = errorHelper(error.code);
    yield put(loginUserRoutine.failure(message));
  }
}

function* watchAddNewUserRequest() {
  yield takeEvery(addNewUserRoutine.TRIGGER, addNewUserRequest);
}

function* forgotPasswordRequest({ payload }: Routine<any>) {
  try {
    yield call(forgotPassword, payload);
    yield put(forgotPasswordRoutine.success());
  } catch (error) {
    const message = errorHelper(error.code);
    yield put(forgotPasswordRoutine.failure(message));
    Error(message);
  }
}

function* watchForgotPasswordRequest() {
  yield takeEvery(forgotPasswordRoutine.TRIGGER, forgotPasswordRequest);
}

function* resetPasswordRequest({ history, ...payload }: Routine<any>) {
  try {
    // yield call(resetPassword, payload);
    yield put(resetPasswordRoutine.success());
  } catch (error) {
    const message = errorHelper(error.code);
    yield put(resetPasswordRoutine.failure(message));
  }
}

function* watchResetPasswordRequest() {
  yield takeEvery(resetPasswordRoutine.TRIGGER, resetPasswordRequest);
}

export default function* userSaga() {
  yield all([
    watchAddNewUserRequest(),
    watchUserRequest(),
    watchLoginUserRequest(),
    watchForgotPasswordRequest(),
    watchResetPasswordRequest()
  ]);
}
