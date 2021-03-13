import { createRoutine } from 'redux-saga-routines';

export const fetchResourceRoutine = createRoutine('RESOURCES:FETCH_RESOURCE');
export const editResourseRoutine = createRoutine('RESOURCES:EDIT_RESOURSE');
export const deleteResourceRoutine = createRoutine('RESOURCES:DELETE_RESOSOURCE');
