import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import { IAppState } from '../common/models/store/IAppState';
import { IUser } from '../common/models/user/IUser';
import { IUserOrganization } from '../common/models/user/IUserOrganization';
import { fetchOrganization, postCreateOrganization } from '../services/userService';
import { fetchOrgInfoRoutine, createOrganizationRoutine } from '../routines/userOrganization';

function* watchFetchUserOrganization() {
  yield takeEvery(fetchOrgInfoRoutine.TRIGGER, fetchUserOrganization);
}

const selectUser = (state: IAppState) => state.user.user;

function* fetchUserOrganization() {
  const user: IUser = yield select(selectUser);
  try {
    const response: IUserOrganization = yield call(
      // Will be implemented
      fetchOrganization, user.id, user.organizationId || ''
    );
    yield put(fetchOrgInfoRoutine.success({ user, currentOrganization: response }));
  } catch {
    yield put(fetchOrgInfoRoutine.failure({ user }));
  }
}

function* watchCreateOrganization() {
  yield takeEvery(createOrganizationRoutine.TRIGGER, createOrganization);
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

export default function* organizationUserSaga() {
  yield all([
    watchFetchUserOrganization(),
    watchCreateOrganization()
  ]);
}
