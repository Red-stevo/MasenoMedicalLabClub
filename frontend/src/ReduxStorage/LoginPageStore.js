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
    async (credentials, { rejectWithValue,
        fulfillWithValue}) => {
    try {
        const response = await axiosConfigFreeAPI.post("/login", credentials);
        return fulfillWithValue(response.data)
    }catch (error){
        return rejectWithValue(error.response);
    }
});

export const loginPageStore = createSlice({
    name:"login",
    initialState,
    reducers:{},
    extraReducers: builder => builder
        .addCase(loginRequest.pending, (state, action) => {
            console.log("initial-state", state.payload, action);
        })
        .addCase(loginRequest.fulfilled, (state, action) => {
            console.log("success:",action.payload);
        })
        .addCase(loginRequest.rejected, (state, action) =>{
            console.error("error", action.payload, "state", state);
        })
});
