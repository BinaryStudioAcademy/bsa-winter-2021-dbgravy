import { combineReducers } from 'redux';
import { user } from './user';
import { reducer as settings } from '../scenes/Settings/reducers';
import { application } from './apps';

const rootReducer = combineReducers({
  user,
  application,
  settings
});

export default rootReducer;
