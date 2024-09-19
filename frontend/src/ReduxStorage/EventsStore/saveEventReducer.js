import {createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";


const eventsDataAdapter = createEntityAdapter();

const initialState = eventsDataAdapter.getInitialState({
    successMessage:null,
    errorMessage:null,
    status:"idle",
});

const saveEvent = createAsyncThunk("save/new-event",
    (eventData, config) => {

    try {



        const response;
    }catch (error){
        return config.rejectWithValue(error.response.data.message);
    }
});
