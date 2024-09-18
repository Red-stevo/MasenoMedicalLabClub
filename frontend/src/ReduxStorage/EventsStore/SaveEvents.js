import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {copyWithStructuralSharing} from "@reduxjs/toolkit/query";

const eventsAdapter = createEntityAdapter();
const cloudName = "de91mnunt";
const uploadPreset = "MasenoMedLabClub";

const initialState = eventsAdapter.getInitialState({
    imageUrl:[],
    eventsError:null,
    uploadError:null,
    uploadSuccess:null,
});

const uploadImages = createAsyncThunk("events/save",
    (imageUrls, config) =>{
    try {
        let urls = [];
        imageUrls.map((image) => {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset",uploadPreset);

            const response =
                axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, image);
            urls.concat(...urls, response.data.secure_url);
        });
        return config.fulfillWithValue(urls)
    }catch (error){
        console.log(error.response.data.message);
        return config.rejectWithValue(error.response.data.message)
    }

});

const SaveEvents = createSlice({
    name:"events",
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder
            .addCase(uploadImages.pending,(state) => {
                state.uploadSuccess = "loading";
                state.imageUrl = [];
                state.eventsError=null;
                state.uploadError=null;
            })
            .addCase(uploadImages.fulfilled, (state, action) => {
                state.uploadSuccess = "success";
                state.imageUrl = action.payload.urls;
                state.eventsError=null;
                state.uploadError=null;
            })
            .addCase(uploadImages.rejected, (state, action) => {
                state.uploadSuccess = "failed";
                state.imageUrl = [];
                state.eventsError=null;
                state.uploadError=action.payload;
            })
    }
});