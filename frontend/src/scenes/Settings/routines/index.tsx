import { createRoutine } from 'redux-saga-routines';

export const fetchUsersRoutine = createRoutine('FETCH_USERS_LIST');
export const inviteNewUserRoutine = createRoutine('SEND_INVITE');
export const userActivationRoutine = createRoutine('USER_ACTIVATE');
export const reinviteUserRoutine = createRoutine('RESEND_INVITE');
export const modalShowRoutine = createRoutine('SHOW_MODAL');
export const inviteUserToOrganizationRoutine = createRoutine('INVITE_USER_TO_ORGANIZATION');
