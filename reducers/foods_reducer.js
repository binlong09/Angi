import {
  FETCH_FOODS
} from '../actions/types';

const INITIAL_STATE = {
  items: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_FOODS:
      return action.payload;
    default:
      return state;
  }
}