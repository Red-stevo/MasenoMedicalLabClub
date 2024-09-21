import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {secureAxiosConfig} from "../../DataSourceConfig/secureAxios.js";

export const  fetchEvents = createAsyncThunk("save-event/get-events",
    async (data,config) => {
        try {
            const response = await secureAxiosConfig.get("/events/get-events");
            return config.fulfillWithValue(response.data);
        } catch (error) {
            return config.rejectWithValue(error);
        }
    });

const getEventsAdapter = createEntityAdapter();

const initialState = getEventsAdapter.getInitialState([]);


const GetEvents = createSlice({
    name:"save-events",
    initialState,
    reducers:{},
    extraReducers: builder =>  {
        builder.addCase(fetchEvents.pending,(state)  => {
            state.eventId = null;
            state.eventName = null;
            state.eventDescription = null;
            state.eventDate = null;
            state.eventLocation = null;
            state.eventImages = null;
            state.status = "loading";
        }).addCase(fetchEvents.fulfilled,(state, action)  => {
            console.log(action.payload);
            return {...action.payload, status:"success"}
        }).addCase(fetchEvents.rejected,(state, action)  => {
            if (action.payload.error.response)
                state.errorMessage = action.payload.error.response.data.message;
            else state.errorMessage = "Error Fetching Events."

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

export default GetEvents.reducer;