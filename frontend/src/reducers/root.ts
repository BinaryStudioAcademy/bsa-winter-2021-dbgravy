import { combineReducers } from 'redux';
import { user } from './user';
import { reducer as settings } from '../scenes/Settings/reducers';
import { application } from './apps';

const rootReducer = combineReducers({
  user,
  app: application,
  settings
});

export default rootReducer;
