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
        builder.addCase(fetchEvents.pending,()  => {
            return [];
        }).addCase(fetchEvents.fulfilled,(state, action)  => {
            return [...action.payload];
        }).addCase(fetchEvents.rejected,()  => {
            return [];
        })
    }
});

export default GetEvents.reducer;