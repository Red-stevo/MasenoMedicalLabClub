import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";


const loginAdapter = createEntityAdapter()
const initialState = loginAdapter.getInitialState({
    username: null,
    userId: null,
    accessToken: null,
    status:"idle",
    successMessage:null,
    errorMessage:null
})

export const loginPageStore = createSlice({

})