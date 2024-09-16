import {configureStore} from "@reduxjs/toolkit";
import {loginPageStore} from "./LoginStore/LoginPageStore.js";

export const store = configureStore({
    reducer:{
        loginReducer:loginPageStore.reducer,
    }
})