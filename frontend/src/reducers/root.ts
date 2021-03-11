import { combineReducers } from 'redux';
import { user } from './user';
import { reducer as settings } from '../scenes/Settings/reducers';
import { application } from './apps';
import { resource } from './resources';

const rootReducer = combineReducers({
  user,
  application,
  resource,
  settings
});

export default rootReducer;
