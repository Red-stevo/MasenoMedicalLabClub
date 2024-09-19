import {configureStore} from "@reduxjs/toolkit";
import loginPageStore from "./LoginStore/LoginPageStore.js";
import {persistReducer, persistStore} from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import saveEventReducer from "./EventsStore/saveEventReducer.js";


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
    }
});

export const persistor = persistStore(store)