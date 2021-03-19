import { combineReducers } from 'redux';
import { user } from './user';
import { reducer as settings } from '../scenes/Settings/reducers';
import { resource } from './resources';
import { appsRootReducer } from './appsRoot';

const rootReducer = combineReducers({
  user,
  app: appsRootReducer,
  resource,
  settings
});

export default rootReducer;
