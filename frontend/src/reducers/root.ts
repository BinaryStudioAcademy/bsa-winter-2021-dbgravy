import { combineReducers } from 'redux';
import { user } from './user';
import { reducer as settings } from '../scenes/Settings/reducers';
import { resource } from './resources';
<<<<<<< HEAD
import { query } from './queries';

const rootReducer = combineReducers({
  user,
  query,
  application,
=======
import { appsRootReducer } from './appsRoot';

const rootReducer = combineReducers({
  user,
  app: appsRootReducer,
>>>>>>> 3f9df4ef0dd29b451d2118339d66774fc876e80b
  resource,
  settings
});

export default rootReducer;
