import { createRoutine } from 'redux-saga-routines';

export const fetchResourceRoutine = createRoutine('RESOURCES:FETCH_RESOURCE');
export const testConnectionRoutine = createRoutine('RESOURCES:TEST_CONNECTION');
export const createResourceRoutine = createRoutine('RESOURCES:CREATE_RESOURCE');
export const updateResourceRoutine = createRoutine('RESOURCES:UPDATE_RESOURCE');
export const getResourceByIdRoutine = createRoutine('RESOURCES:GET_RESOURCE');
export const clearResourceRoitine = createRoutine('RESOURCES:CLEAR_RESOURCE');
