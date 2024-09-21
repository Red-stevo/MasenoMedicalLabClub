import {createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import {secureAxiosConfig} from "../../DataSourceConfig/secureAxios.js";

export const  getEvent = createAsyncThunk("save-event/get-events",
    async (data,config) => {
        try {
            const response = await secureAxiosConfig.get("");
            return config.fulfillWithValue(response.data);
        } catch (error) {
            return config.rejectWithValue(error);
        }
    });

const getEventsAdapter = createEntityAdapter();

const initialState = getEventsAdapter.getInitialState({
    
});