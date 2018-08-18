import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import JOB_DATA from './IndeedJobData.json';

import * as actions from '../actions';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = 'https://jobs.github.com/positions.json?';
const JOB_QUERY_PARAMS = {
  description: 'ruby'
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, location: zip })
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) =>  async (dispatch) => {
  try {
    // let zip = await reverseGeocode(region) ;
    // const url = buildJobsUrl(zip);
    // let { data } = await axios.get(url);
    const data = JOB_DATA;
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
  } catch (e) {
    console.error(e);
  }    
}

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
}

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
}