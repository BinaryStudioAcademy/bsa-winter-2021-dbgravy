import { createRoutine } from 'redux-saga-routines';

export const testConnectionRoutine = createRoutine('TEST_CONNECTION');
export const createResourceRoutine = createRoutine('CREATE_RESOURCE');
export const updateResourceRoutine = createRoutine('UPDATE_RESOURCE');
export const getResourceByIdRoutine = createRoutine('GET_RESOURCE_BY_ID');
export const getResourcesRoutine = createRoutine('GET_RESOURCES');
