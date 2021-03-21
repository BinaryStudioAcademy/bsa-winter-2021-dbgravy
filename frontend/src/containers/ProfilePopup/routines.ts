import { createRoutine } from 'redux-saga-routines';

export const fetchOrgInfoRoutine = createRoutine('FETCH_ORG_INFO');
export const createOrganizationRoutine = createRoutine('CREATE_ORGANIZATION');
export const fetchUserOrganizationsRoutine = createRoutine('FETCH_USER_ORGANIZATIONS');
export const changeUserOrganizationRoutine = createRoutine('CHANGE_USER_ORGANIZATION');
