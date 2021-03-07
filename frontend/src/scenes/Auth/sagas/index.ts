import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { fetchUserRoutine, addNewUserRoutine, loginUserRoutine } from '../routines';
import { registration, login, fetchUser } from '../../../services/authService';
import { IAuthServerResponse } from '../../../common/models/auth/AuthServerResponse';
import { IUser } from '../../../common/models/user/IUser';
import { setTokens, clearStorage } from '../../../common/helpers/storageHelper';

function* fetchUserRequest() {
  try {
    const user:IUser = yield call(fetchUser);
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
  } catch (error) {
    if (error.message.includes('duplicate key value')) {
      error.message = 'User with this email already exists.';
    }
    yield put(addNewUserRoutine.failure(error.message));
  }
}

function* watchAddNewUserRequest() {
  yield takeEvery(addNewUserRoutine.TRIGGER, addNewUserRequest);
}

export default function* userSaga() {
  yield all([
    watchAddNewUserRequest(),
    watchUserRequest(),
    watchLoginUserRequest()
  ]);
}
