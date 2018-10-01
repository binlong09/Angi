import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import * as actions from '.';

import {
  FETCH_FOODS,
  LIKE_FOOD,
  CLEAR_LIKED_FOODS
} from './types';

const FOOD_ROOT_URL = 'https://www.foody.vn/__get/Place/HomeListPlace?';
const FOOD_QUERY_PARAMS = {
  t: null,
  page: 1,
  count: 120,
  cateId: null,
  districtId: null,
  isReputation: null,
  type: 1
};

const buildFoodsUrl = (region) => {
  console.log(region)
  const query = qs.stringify({ ...FOOD_QUERY_PARAMS, lat: region.latitude , lon: region.longitude })
  return `${FOOD_ROOT_URL}${query}`;
};

formatCoords = (region) => {
  return `${region.latitude}-${region.longitude}`
}

export const fetchFoods = (region, callback) =>  async (dispatch) => {
  try {
    const url = buildFoodsUrl(region);
    coords = formatCoords(region)
    console.log(coords)
    let { data } = await axios({
      method: 'get',
      url: url,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": `_pos.coords=${coords}`
      }
    })
    dispatch({ type: FETCH_FOODS, payload: data.Items });
    callback();
  } catch (e) {
    console.error(e);
  }
}

export const likeFood = (food) => {
  return {
    payload: food,
    type: LIKE_FOOD
  };
}

export const clearLikedFoods = () => {
  return { type: CLEAR_LIKED_FOODS };
}