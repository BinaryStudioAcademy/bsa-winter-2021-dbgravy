import { application } from './apps';
import { combineReducers } from 'redux';
import { queries } from './queries';
import { appsEditor } from './appsEditor';

export const appsRootReducer = combineReducers({
  application,
  qur: queries,
  editor: appsEditor
});
