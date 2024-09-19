import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import axiosConfigFreeAPI from "../../DataSourceConfig/axiosConfig.js";


const loginAdapter = createEntityAdapter()
const initialState = loginAdapter.getInitialState({
    userId:null,
    accessToken:null,
    status:"idle",
    successMessage:null,
    errorMessage:null,
    isAuthenticated:null,
    userRole:null,
});


export const loginRequest = createAsyncThunk("login/user-login", async (credentials, { rejectWithValue, fulfillWithValue}) => {
    try {
        const response = await axiosConfigFreeAPI.post("/login", credentials);
        return fulfillWithValue(response.data);
    }catch (error){
        return rejectWithValue(error.response.data);
    }
});

const loginPageStore = createSlice({
    name:"login",
    initialState,
    reducers:{
        clearLoginErrorMessage:(state) => {state.errorMessage = null},
        updateToken:(state, action) => {
            const {accessToken, userId, userRole} = action.payload;
            state.accessToken = accessToken;
            state.userId = userId;
            state.userRole = userRole;
        },
        userLogout:(state) => {
            state.status = "idle";
            state.errorMessage = null;
            state.accessToken = null;
            state.userId = null;
            state.successMessage = null;
            state.userRole = null;
            state.isAuthenticated = null;
        },
    },
    extraReducers: builder => builder
        .addCase(loginRequest.pending, (state, action) => {
            state.status = "loading";
        }).addCase(loginRequest.fulfilled, (state, action) => {
            state.status = "success";
            state.accessToken = action.payload.token;
            state.userId = action.payload.userId;
            state.successMessage = action.payload.message;
            state.userRole = action.payload.userRole;
            state.isAuthenticated = true;
            state.errorMessage = null;
        }).addCase(loginRequest.rejected, (state, action) => {
            state.status = "error";
            state.errorMessage = action.payload.message;
            state.accessToken = null;
            state.userId = null;
            state.successMessage = null;
            state.userRole = null;
            state.isAuthenticated = false;
        })
});
export default loginPageStore.reducer;

export const
    {
        clearLoginErrorMessage,
        updateToken,
        userLogout
    } = loginPageStore.actions;