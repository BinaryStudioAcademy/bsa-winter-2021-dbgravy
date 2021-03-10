import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import { IAppState } from '../../../common/models/store/IAppState';
import { IUser } from '../../../common/models/user/IUser';
import { IUserOrganization } from '../../../common/models/user/IUserOrganization';
import { fetchOrganization, postCreateOrganization } from '../../../services/userService';
import { fetchOrgInfoRoutine, createOrganizationRoutine } from '../routines/index';

function* watchFetchUserOrganization() {
  yield takeEvery(fetchOrgInfoRoutine.TRIGGER, fetchUserOrganization);
}

const selectUser = (state: IAppState) => state.user.user;

function* fetchUserOrganization() {
  const user: IUser = yield select(selectUser);
  try {
    const response: IUserOrganization = yield call(fetchOrganization, user.id, '111f65db-736a-4bfb-ab9e-55f9b7616da2');
    yield put(fetchOrgInfoRoutine.success({ user, currentOrganization: response }));
  } catch {
    yield put(fetchOrgInfoRoutine.failure({ user }));
  }
}

function* watchCreateOrganization() {
  yield takeEvery(createOrganizationRoutine.TRIGGER, createOrganization);
}

function* createOrganization() {
  try {
    const { newOrganization, id: createdByUserId } = yield select(selectUser);

    const response: { created: boolean } = yield call(postCreateOrganization,
      { name: newOrganization.name, createdByUserId });
    yield put(createOrganizationRoutine.success(response));
  } catch {
    //
  }
}

export default function* organizationUserSaga() {
  yield all([
    watchFetchUserOrganization(),
    watchCreateOrganization()
  ]);
}
