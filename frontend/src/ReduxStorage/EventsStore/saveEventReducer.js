import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {secureAxiosConfig} from "../../DataSourceConfig/secureAxios.js";

const eventsDataAdapter = createEntityAdapter();

const initialState = eventsDataAdapter.getInitialState({
    successMessage:null,
    errorMessage:null,
    status:"idle",
});

export const updateEventReducer = createAsyncThunk("save-event/update",
    async (eventUpdates, config) => {
        console.log("update request", eventUpdates);
        try {
            const response = await secureAxiosConfig.put(`/admin/events/update/${eventUpdates.eventId}`
                , {
                    eventName: eventUpdates.eventName, eventLocation: eventUpdates.eventLocation,
                    eventDate: eventUpdates.eventDate, eventDescription: eventUpdates.eventDescription,
                    requestList: eventUpdates.requestList
                });

            return config.fulfillWithValue(response.data);
        } catch (error) {
            return config.rejectWithValue(error.response);
        }

    });


export const saveEvent = createAsyncThunk("save-event/new-event",
    async (eventData = null, config) => {

    try {
        const response = await secureAxiosConfig.post("/admin/events/create", eventData);
        return config.fulfillWithValue(response.data);
    }catch (error) {
        return config.rejectWithValue(error.response.data);
    }
});

const saveEventReducer = createSlice({
    name:"save-event",
    initialState,
    reducers:{
        clearErrorMessage:(state) => {state.errorMessage = null},
        clearSuccessMessage:(state) => {state.successMessage = null},
        setUploadError:(state, action) => {state.errorMessage = action.payload.error},
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
                if (action.payload)
                    state.errorMessage = action.payload.message;
                else
                    state.errorMessage = "Error posting The Event.";

                state.successMessage = null;
                state.status = "failed";
            })
            .addCase(updateEventReducer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateEventReducer.fulfilled, (state, action) => {
                state.status = "success";
                state.successMessage = action.payload.message;
                state.errorMessage = null;
            })
            .addCase(updateEventReducer.rejected, (state, action) => {
                /*console.log(action.payload.data);*/
                if (action.payload) state.errorMessage = action.payload.message;

                else state.errorMessage = "Error updating The Event.";

                state.successMessage = null;
                state.status = "failed";
            });
    }
});

export const  {
    clearErrorMessage,
    clearSuccessMessage,
    setUploadError
} = saveEventReducer.actions
export default saveEventReducer.reducer;
