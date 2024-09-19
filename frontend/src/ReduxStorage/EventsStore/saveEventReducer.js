import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import axiosConfig from "../../DataSourceConfig/axiosConfig.js";

const eventsDataAdapter = createEntityAdapter();

const initialState = eventsDataAdapter.getInitialState({
    successMessage:null,
    errorMessage:null,
    status:"idle",
});

export const saveEvent = createAsyncThunk("save-event/new-event",
    async (eventData, config) => {

    try {
        const response = await axiosConfig.post("/admin/events/create", eventData);
        return config.fulfillWithValue(response.data);
    }catch (error) {
        return config.rejectWithValue(error.response.data);
    }
});


const saveEventReducer = createSlice({
    name:"save-event",
    initialState,
    reducers:{
        clearErrorMessage:(state) => state.errorMessage = null,
        clearSuccessMessage:(state) => state.successMessage = null
    },
    extraReducers:builder => {
        builder
            .addCase(saveEvent.pending, (state) => {
                state.status = "loading";
            })
            .addCase(saveEvent.fulfilled, (state, action) => {
                state.status = "success";
                state.successMessage = action.payload.message;
                state.errorMessage = null;
            })
            .addCase(saveEvent.rejected, (state, action) => {
                /*console.log(action.payload.data);*/
                if (action.payload.message)
                    state.errorMessage = action.payload;
                else
                    state.errorMessage = "Error posting The Event.";

                state.successMessage = null;
                state.status = "failed";
            });
    }
});

export const  {
    clearErrorMessage,
    clearSuccessMessage
} = saveEventReducer.actions
export default saveEventReducer.reducer;
