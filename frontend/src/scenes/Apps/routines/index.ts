import { createRoutine } from 'redux-saga-routines';

export const fetchAppRoutine = createRoutine('APPLICATIONS:FETCH_APP');
export const addAppRoutine = createRoutine('APPLICATIONS:ADD_APP');
export const editAppRoutine = createRoutine('APPLICATIONS:EDIT_APP');
export const deleteAppRoutine = createRoutine('APPLICATIONS:DELETE_APP');
export const showEditRoutine = createRoutine('APPLICATIONS:EDIT_MODAL');
export const setCurrentlyAppId = createRoutine('SET_CURRENTLY_APP_ID');
export const fetchEditorComponentsRoutine = createRoutine('EDITOR:FETCH_COMPONENTS');
export const addComponentRoutine = createRoutine('EDITOR:ADD_COMPONENT');
export const updateComponentRoutine = createRoutine('EDITOR:UPDATE_COMPONENT');
