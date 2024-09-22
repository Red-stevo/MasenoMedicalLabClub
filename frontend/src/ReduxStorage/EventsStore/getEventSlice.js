import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {secureAxiosConfig} from "../../DataSourceConfig/secureAxios.js";

const getEventAdapter = createEntityAdapter();

const initialState = getEventAdapter.getInitialState({
   eventName:null,

    eventDescription:null,

    eventDate:null,

    eventLocation:null,

    eventImages:[],

    status:"idle",
    errorMessage:null

});

export const getEventAsyncReducer = createAsyncThunk("get-event-by-id/get-user-event",
    async (eventId, config) => {
        try {
            const response = await secureAxiosConfig.get(`events/${eventId}/get-event`);
            return config.fulfillWithValue(response.data);
        } catch (error) {
            return  config.rejectWithValue(error);
        }
    });


const getEventSlice = createSlice({
    name:"get-event-by-id",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getEventAsyncReducer.pending, (state) => {
                return {status:"loading", ...state, errorMessage:null};
            })
            .addCase(getEventAsyncReducer.fulfilled, (state, action) => {
                return {...state, ...action.payload, status:"idle", errorMessage:null};
            })
            .addCase(getEventAsyncReducer.rejected, (state,action) => {
                if (action.payload.response)
                    return {...state, errorMessage: action.payload.response.data.message, status: "failed"};
                else
                    return {...state, errorMessage: "Error Fetching Images.", status: "failed"};
            })
    }
});

export default getEventSlice.reducer;
