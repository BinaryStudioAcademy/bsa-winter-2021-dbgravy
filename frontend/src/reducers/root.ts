import { combineReducers } from 'redux';
import { user } from './user';
import { reducer as settings } from '../scenes/Settings/reducers';

const rootReducer = combineReducers({
  user, settings
});

export default rootReducer;
