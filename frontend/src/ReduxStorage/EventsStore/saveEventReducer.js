import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import secureAxios from "../../DataSourceConfig/secureAxios.js";
import axiosConfig from "../../DataSourceConfig/axiosConfig.js";


const eventsDataAdapter = createEntityAdapter();

const initialState = eventsDataAdapter.getInitialState({
    successMessage:null,
    errorMessage:null,
    status:"idle",
});

const saveEvent = createAsyncThunk("save-event/new-event",
    (eventData, config) => {

    try {
        const response = axiosConfig.post();

    }catch (error){
        return config.rejectWithValue(error.response.data.message);
    }
});


const saveEventReducer = createSlice({
    name:"/save-event",
    initialState,
    reducers:{}
});