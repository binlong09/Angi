import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import { connect } from 'react-redux';
import fetch from 'fetch';

import * as actions from '../actions';

import {
  FETCH_JOBS
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
    let zip = await reverseGeocode(region) ;
    const url = buildJobsUrl(zip);
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();    
  } catch (e) {
    console.error(e);
  }    
}