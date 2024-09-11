import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import axiosConfig from "../../DataSourceConfig/axiosConfig.js";

const imagesAdapter = createEntityAdapter();

const initialState = imagesAdapter.getInitialState({
    status:"idle"
});

const fetchImages = createAsyncThunk("indexImages/allImages",
    (state, action) => {
        const response = axiosConfig.get("");
    });


const imageStore = createSlice({
    name:"indexImages",
    initialState,
    reducers : {

    },
    extraReducers: builder => {
        builder
            .addCase()
    }
})