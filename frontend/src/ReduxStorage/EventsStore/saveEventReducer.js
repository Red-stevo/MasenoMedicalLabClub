import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";


const eventsDataAdapter = createEntityAdapter();

const initialState = eventsDataAdapter.getInitialState({
    successMessage:null,
    errorMessage:null,
    status:"idle",
});

const saveEvent = createAsyncThunk("save-event/new-event",
    (eventData, config) => {

    try {

    }catch (error){
        return config.rejectWithValue(error.response.data.message);
    }
});


const saveEventReducer = createSlice({
    name:"/save-event",
    initialState,
    reducers:{}
});