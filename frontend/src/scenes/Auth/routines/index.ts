import { createRoutine } from 'redux-saga-routines';

export const loginUserRoutine = createRoutine('LOGIN_USER');
export const addNewUserRoutine = createRoutine('ADD_NEW_USER');
export const fetchUserRoutine = createRoutine('FETCH_USER');
export const logotUserRoutine = createRoutine('LOGOT_USER');
export const forgotPasswordRoutine = createRoutine('FORGOT_PASSWORD');
export const resetPasswordRoutine = createRoutine('RESET_PASSWORD');
