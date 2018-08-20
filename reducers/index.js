import { combineReducers } from 'redux';
import auth from './auth_reducer';
import foods from './foods_reducer';
import likedFoods from './likes_reducer';

export default combineReducers({
  auth, foods, likedFoods //ES6 or auth: auth
})