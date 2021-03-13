import { createRoutine } from 'redux-saga-routines';

export const fetchAppRoutine = createRoutine('APPLICATIONS:FETCH_APP');
export const addAppRoutine = createRoutine('APPLICATIONS:ADD_APP');
export const editAppRoutine = createRoutine('APPLICATIONS:EDIT_APP');
export const deleteAppRoutine = createRoutine('APPLICATIONS:DELETE_APP');
