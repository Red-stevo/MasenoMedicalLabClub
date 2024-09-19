import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import axiosConfig from "../../DataSourceConfig/axiosConfig.js";


const eventsDataAdapter = createEntityAdapter();

const initialState = eventsDataAdapter.getInitialState({
    successMessage:null,
    errorMessage:null,
    status:"idle",
});

export const saveEvent = createAsyncThunk("save-event/new-event",
    (eventData, config) => {

    try {
        const response = axiosConfig.post("/admin/events/create", eventData);
        return config.fulfillWithValue(response.data.message);
    }catch (error) {
        if (error.response)
            return config.rejectWithValue(error.response.data.message);

        return config.rejectWithValue("Error posting event.");
    }
});


const saveEventReducer = createSlice({
    name:"/save-event",
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(saveEvent.pending, (state) => {
                state.status = "loading";
            })
            .addCase(saveEvent.fulfilled, (state, action) => {
                state.status = "success";
                state.successMessage = action.payload;
                state.errorMessage = null;
            })
            .addCase(saveEvent.rejected, (state, action) => {
                state.status = "failed";
                state.errorMessage = action.payload;
                state.successMessage = null;
            });
    }
});

export default saveEventReducer.reducer;
