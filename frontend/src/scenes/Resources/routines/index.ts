import { createRoutine } from 'redux-saga-routines';

export const fetchResourceRoutine = createRoutine('RESOURCES:FETCH_RESOURCE');
export const testConnectionRoutine = createRoutine('RESOURCES:TEST_CONNECTION');
export const createResourceRoutine = createRoutine('RESOURCES:CREATE_RESOURCE');
export const updateResourceRoutine = createRoutine('RESOURCES:UPDATE_RESOURCE');
export const getResourceByIdRoutine = createRoutine('RESOURCES:GET_RESOURCE_BY_ID');
export const deleteResourceByIdRoutine = createRoutine('RESOURCES:GET_DELETE_BY_ID');
