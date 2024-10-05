import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {secureAxiosConfig} from "../DataSourceConfig/secureAxios.js";
import {store} from "./Store.js";

const userManagementAdapter = createEntityAdapter({
    selectId: user => user.userId
});

const initialState = userManagementAdapter.getInitialState({
    loading:false,
    error:null,
    updateMessage:null,
    updateError:null,
    updateLoading:false,
    registerError:null,
    registrationComplete:false
});

export const registerUsers = createAsyncThunk(
    "user-management/register-users",
    async (userList=null, config) => {
        try {
            const response = await secureAxiosConfig.post("/admin/register", userList);
            return config.fulfillWithValue(response.data)
        }catch (error){
            return config.rejectWithValue(error.response ? error.response.message : error.message)
        }
    }
)

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
    async (userUpdates=null, config) => {

        try {
            const response = await secureAxiosConfig.put(`/admin/update/${userUpdates.userId}`,
                userUpdates);
            store.dispatch(update({id: userUpdates.userId, changes: {...userUpdates}}));
            return config.fulfillWithValue(response.data);
        } catch (error) {
            return config.rejectWithValue(error ? error.response.data : error.message);
        }

    })

const userManagementStore = createSlice({
    name:"user-management",
    initialState,
    reducers: {
        update: userManagementAdapter.updateOne,
    },
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
            })
            .addCase(updateUser.pending, (state) => {
                state.updateLoading = true;
                state.updateError = null;
                state.updateMessage = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.updateMessage = action.payload.message;
                state.updateError = null;
                state.updateLoading = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateError = action.payload || "User Update Failed, User Exist!";
                state.updateLoading = false;
            })
            .addCase(registerUsers.pending, (state) => {
                state.registrationComplete = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUsers.fulfilled, (state) => {
                state.registrationComplete = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUsers.rejected, (state, action) => {
                state.loading = true;
                state.registrationComplete = false;
                state.error = action.payload || "Failed to register users.";
            })
    }
});


export default userManagementStore.reducer;

export const {
    update,
} = userManagementStore.actions;

export const {selectAll} =
    userManagementAdapter.getSelectors(state => state.userManagementReducer);
