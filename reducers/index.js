import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './job_reducer';

export default combineReducers({
  auth, jobs //ES6 or auth: auth
})