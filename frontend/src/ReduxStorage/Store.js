import {configureStore} from "@reduxjs/toolkit";
import loginPageStore from "./LoginStore/LoginPageStore.js";
import {persistReducer, persistStore} from "redux-persist";


const config = {
    key:"authentication",
    storage:sessionStorage,
    whitelist:["isAuthenticated, accessToken, userRole, userId, username"]
}

const persistentReducer = persistReducer(config, loginPageStore);

export const store = configureStore({
    reducer:{
        loginReducer:persistentReducer,
    }
})

export const persistor = persistStore(store)