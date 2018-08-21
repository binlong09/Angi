import _ from 'lodash';
import {
  LIKE_FOOD,
  CLEAR_LIKED_FOODS
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case LIKE_FOOD:
      return _.uniqBy([
        action.payload, ...state
      ], 'id')
    case CLEAR_LIKED_FOODS:
      return [];
    default:
      return state
  }
}