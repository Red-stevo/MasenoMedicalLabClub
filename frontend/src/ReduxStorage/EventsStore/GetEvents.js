import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {secureAxiosConfig} from "../../DataSourceConfig/secureAxios.js";

export const  getEvent = createAsyncThunk("save-event/get-events",
    async (data,config) => {
        try {
            const response = await secureAxiosConfig.get("get-events/get-events");
            return config.fulfillWithValue(response.data);
        } catch (error) {
            return config.rejectWithValue(error);
        }
    });

const getEventsAdapter = createEntityAdapter();

const initialState = getEventsAdapter.getInitialState({
    eventId : null,
    eventName : null,
    eventDescription : null,
    eventDate : null,
    eventLocation : null,
    eventImages : null,
    status:"idle",
    errorMessage:null
});


const GetEvents = createSlice({
    name:"get-events",
    reducers:{},
    extraReducers: builder =>  {
        builder.addCase(getEvent.pending,(state)  => {
            state.eventId = null;
            state.eventName = null;
            state.eventDescription = null;
            state.eventDate = null;
            state.eventLocation = null;
            state.eventImages = null;
            state.status = "loading";
        }).addCase(getEvent.fulfilled,(state, action)  => {
            state.eventId = action.payload.eventId;
            state.eventName = action.payload.eventName;
            state.eventDescription = action.payload.eventDescription;
            state.eventDate = action.payload.eventDate;
            state.eventLocation = action.payload.eventLocation;
            state.eventImages = action.payload.eventImages;
            state.status = "idle";
        }).addCase(getEvent.rejected,(state, action)  => {

            if (action.payload.error.response)
                state.errorMessage = action.payload.error.response.data.message;
            else
                state.errorMessage = "Error Fetching Events."


            state.eventName = null;
            state.eventDescription = null;
            state.eventDate = null;
            state.eventLocation = null;
            state.eventImages = null;
            state.status = "failed";
            state.eventId = null;
        })
    }
});