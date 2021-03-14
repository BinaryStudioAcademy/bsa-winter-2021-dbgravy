import { createRoutine } from 'redux-saga-routines';

export const fetchQueryRoutine = createRoutine('FETCH_QUERY');
export const openQueryRoutine = createRoutine('OPEN_QUERY');
export const setSelectQueryRoutine = createRoutine('SELECT_QUERY');
export const saveSelectQueryRoutine = createRoutine('SAVE_QUERY');
export const duplicateSelectQueryRoutine = createRoutine('DUPLICATE_QUERY');
export const deleteSelectQueryRoutine = createRoutine('DELETE_QUERY');
export const setNewCodeRoutine = createRoutine('SET_NEW_CODE_QUERY');
export const setWaiterQueryRoutine = createRoutine('WAIT_QUERY');
export const setNewNameQueryRoutine = createRoutine('SER_NEW_CODE_QUERY');
