import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import  {toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import {getUserFromLocalStorage, addUserToLocalstorage,removeUserFromLocalStorage} from '../../utils/localStorage';
import { registerUserThunk,loginUserThunk,updateUserThunk , clearStoreThunk} from './userThunk';

const initialState = {
    isLoading:false,
    isSidebarOpen:false,
    user:getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('/auth/login', user, thunkAPI);
  }
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    return updateUserThunk('/auth/updateUser', user, thunkAPI);
  }
);

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers : {
        logoutUser: (state,{payload}) =>{
            state.user = null;
            state.isSidebarOpen = false;
            toast.success('logout successful!')
            removeUserFromLocalStorage();
            if(payload) {
                toast.success(payload);
            }
        },
        toggleSidebar: (state) => {
         state.isSidebarOpen = !state.isSidebarOpen;
        },
    },
    extraReducers : (builder) =>{
        builder.addCase(registerUser.pending, (state)=>{
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, {payload})=>{
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalstorage(user);
            toast.success(`Hello There ${user.name}`)
        }).addCase(registerUser.rejected, (state, {payload})=>{
            state.isLoading = false;
            toast.error(payload);
        }).addCase(loginUser.pending, (state)=>{
            state.isLoading = true;
        }).addCase(loginUser.fulfilled,(state,{payload})=>{
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalstorage(user);
            toast.success(`Welcome back ${user.name}`);
        }).addCase(loginUser,(state, {payload})=>{
            state.isLoading = false;
            toast.error(payload);
        }).addCase(updateUser.pending,(state)=>{
            state.isLoading = true;
        }).addCase(updateUser.fulfilled, (state,{payload})=>{
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalstorage(user);
            toast.success('User updated')
        }).addCase(updateUser.rejected,(state,{payload})=>{
            state.isLoading = false;
            toast.error(payload);
        }).addCase(clearStore.rejected,()=>{
            toast.error('There was an error');
        });
    },
});

export const {toggleSidebar, logoutUser} = userSlice.actions;

export default userSlice.reducer;