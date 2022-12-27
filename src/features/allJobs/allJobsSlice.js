import {toast} from 'react-toastify';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { showStatsThunk, getAllJobsThunk } from './allJobsThunk';

const initialFilterOptions = {
    search:'',
    searchStatus:'all',
    searchType:'all',
    sort:'latest',
    sortOptions:['latest','oldest','a-z','z-a'],
};

const initialState = {
    isLoading:false,
    jobs:[],
    totalJobs:0,
    numOfPages:'',
    page:1,
    stats:{},
    monthlyApplications:[],
    ...initialFilterOptions
}

export const getAllJobs = createAsyncThunk('/allJobs/getJobs', getAllJobsThunk);

export const showStats = createAsyncThunk('allJobs/showStats',showStatsThunk);



const allJobsSlice =  createSlice({
    name:'allJobs',
    initialState,
    reducers:{
        showLoading: (state) => {
            state.isLoading =true;
        },
        hideLoading: (state) => {
            state.isLoading = false;
        },
        handleChange: (state,{payload})=>{
           const {name,value} = payload;
           state[name] = value;
           state.page =1;
        },
        clearFilters: (state)=>{
           return {...state,...initialFilterOptions}
        },
        changePage: (state,{payload})=>{
            state.page = payload;
        },
        clearAllJobsState:(state)=> {
            return {...initialState} 
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllJobs.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getAllJobs.fulfilled, (state,{payload})=>{
            state.isLoading = false;
            state.jobs = payload.jobs;            
            state.totalJobs = payload.totalJobs;
            state.numOfPages = payload.numOfPages;
            

        }).addCase(getAllJobs.rejected, (state,{payload})=>{
            state.isLoading=false;
            toast.error(payload);
        }).addCase(showStats.pending, (state)=>{
            state.isLoading = true;

        }).addCase(showStats.fulfilled,(state,{payload})=>{
            state.isLoading = false;
            state.stats = payload.defaultStats;
            state.monthlyApplications = payload.monthlyApplications;
        }).addCase(showStats.rejected,(state,{payload})=>{
            state.isLoading = false;
            toast.error(payload);
        })
    }
});

export const {showLoading, hideLoading, handleChange, clearFilters,changePage,clearAllJobsState} = allJobsSlice.actions;
export default allJobsSlice.reducer;