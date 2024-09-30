import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {secureAxiosConfig} from "../DataSourceConfig/secureAxios.js";

const userManagementAdapter = createEntityAdapter({
    selectId: user => user.userId
})

const initialState = userManagementAdapter.getInitialState({
    loading:false,
    error:null,
    updateMessage:null,
});

export const getUsers = createAsyncThunk("user-management/get-users",
    async (_, config) => {
        try {
            const response = await secureAxiosConfig.get("/admin/get_all_users");
            return config.fulfillWithValue(response.data);
        }catch (error){
            return config.rejectWithValue(error ? error.response.data : error.message);
        }
    });

export const updateUser = createAsyncThunk("user-management",
    async (userUpdates, config) => {

    try {
        const response = secureAxiosConfig.put(`/admin/update/${userUpdates.userId}`, userUpdates);
        return config.fulfillWithValue((await response).data);
    }catch (error) {
        return config.rejectWithValue(error ? error.response.data : error.message);
    }

    })


const userManagementStore = createSlice({
    name:"user-management",
    initialState,
    reducers:{ update:userManagementAdapter.updateOne,},
    extraReducers:builder => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                userManagementAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error Fetching Users.";
            });
    }
});


export default userManagementStore.reducer;

export const { update } = userManagementStore.actions;

export const {selectAll,selectById} =
    userManagementAdapter.getSelectors(state => state.userManagementReducer);
