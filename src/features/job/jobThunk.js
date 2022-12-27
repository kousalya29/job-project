import customFetch, {checkForUnauthorizedResponse} from "../../utils/axios";
import {clearValues} from '../job/jobSlice';

import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';

export const createJobThunk =async (job, thunkAPI) =>{
    try {
        const resp =  await customFetch.post('/jobs', job);
        thunkAPI.dispatch(clearValues());
        return resp.data;
    } catch(error) {
       
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
};

export const deleteJobThunk =  async(jobId, thunkAPI)=>{
    thunkAPI.dispatch(showLoading());
    try {
        const resp = await customFetch.delete(`/jobs/${jobId}`);
        thunkAPI.dispatch(getAllJobs());
        return resp.data;
    } catch(error) {
        thunkAPI.dispatch(hideLoading());
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
};

export const updateJobThunk = async({jobId,job}, thunkAPI)=>{
    thunkAPI.dispatch(showLoading());
    try {
        const resp = await customFetch.patch(`/jobs/${jobId}`,job);
        thunkAPI.dispatch(clearValues());
        return resp.data;
    } catch(error) {
        
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
};