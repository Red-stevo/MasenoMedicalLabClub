import {configureStore} from "@reduxjs/toolkit";
import loginPageStore from "./LoginStore/LoginPageStore.js";
import {persistReducer, persistStore} from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import saveEventReducer from "./EventsStore/saveEventReducer.js";
import GetEvents from "./EventsStore/GetEvents.js";
import getEventSlice, {getEventAsyncReducer} from "./EventsStore/getEventSlice.js";
import userManagement from "../Pages/ProtectedPage/UserManagement/Components/UserManagement.jsx";
import userManagementStore from "./UserManagementStore.js";


const config = {
    key:"authentication",
    storage:sessionStorage,
    whitelist:["isAuthenticated","accessToken","userRole","userId"]
}

const persistentReducer = persistReducer(config, loginPageStore);

export const store = configureStore({
    reducer:{
        loginReducer:persistentReducer,
        saveEventReducer:saveEventReducer,
        events:GetEvents,
        eventReducer:getEventSlice,
        userManagementReducer:userManagementStore,
    }
});

export const persistor = persistStore(store)