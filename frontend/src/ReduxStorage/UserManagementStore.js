import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {secureAxiosConfig} from "../DataSourceConfig/secureAxios.js";

const userManagementAdapter = createEntityAdapter()

const initialState = userManagementAdapter.getInitialState([]);

const getUsers = createAsyncThunk("user-management/get-users",
    async (data=null, config) => {
        try {
            const response = await secureAxiosConfig.get("/admin/get_all_users");
            return config.fulfillWithValue(response);
        }catch (error){
            return config.rejectWithValue(error);
        }
    });


const userManagementStore = createSlice({
    name:"user-management",
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(getUsers.pending, () => {
                return [{status:"pending"}];
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                return [...action.payload];
            })
            .addCase(getUsers.rejected, () => {
                return [];
            });
    }
});

export default userManagementStore.reducer;
