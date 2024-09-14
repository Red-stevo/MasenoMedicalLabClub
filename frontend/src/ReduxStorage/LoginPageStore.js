import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import axiosConfigFreeAPI from "../DataSourceConfig/axiosConfig.js";


const loginAdapter = createEntityAdapter()
const initialState = loginAdapter.getInitialState({
    username: null,
    userId: null,
    accessToken: null,
    status:"idle",
    successMessage:null,
    errorMessage:null,
    isLoggedIn:null,
});


export const loginRequest = createAsyncThunk("login/user-login",
    (credentials,
     {rejectWithValue}) =>{
        axiosConfigFreeAPI.post("/login", credentials).then(
            (response) => { console.log(response)}
        ).catch((error) => {return rejectWithValue(error)});
    }
)

export const loginPageStore = createSlice({
    name:"login",
    initialState,
    reducers:{},
    extraReducers: builder => builder
        .addCase(loginRequest.pending, (state, action) => {
            console.log(state, action);
        })
        .addCase(loginRequest.fulfilled, (state, action) => {
            console.log(action);
        })
        .addCase(loginRequest.rejected, (state, action) =>{
            console.log(action);
        })
})
