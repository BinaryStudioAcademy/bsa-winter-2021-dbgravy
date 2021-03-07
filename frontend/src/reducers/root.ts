import { combineReducers } from 'redux';
import { user } from './user';
import { application } from './apps';

const rootReducer = combineReducers({
  user,
  application
});

export default rootReducer;
