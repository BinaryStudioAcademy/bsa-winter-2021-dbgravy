import { createRoutine } from 'redux-saga-routines';

export const fetchAppRoutine = createRoutine('APPLICATIONS:FETCH_APP');
export const addAppRoutine = createRoutine('APPLICATIONS:ADD_APP');
export const editAppRoutine = createRoutine('APPLICATIONS:EDIT_APP');
export const deleteAppRoutine = createRoutine('APPLICATIONS:DELETE_APP');
export const showEditRoutine = createRoutine('APPLICATIONS:EDIT_MODAL');
export const setCurrentlyAppId = createRoutine('SET_CURRENTLY_APP_ID');
export const fetchSelectAppRoutine = createRoutine('FETCH_SELECT_APP');
export const setNewAppNameRoutine = createRoutine('SET_NEW_APP_NAME_APP');
