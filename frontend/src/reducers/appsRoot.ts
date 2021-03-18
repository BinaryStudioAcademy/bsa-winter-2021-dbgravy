import { application } from './apps';
import { combineReducers } from 'redux';
import { queries } from './queries';

export const appsRootReducer = combineReducers({
  application,
  qur: queries
});
