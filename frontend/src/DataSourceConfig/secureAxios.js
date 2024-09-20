import axios from "axios";
import axiosConfigFreeAPI from "./axiosConfig.js";
import {persistor, store} from "../ReduxStorage/Store.js";
import {updateToken, userLogout} from "../ReduxStorage/LoginStore/LoginPageStore.js";

let isRefreshing = false;
let failedRequestsQueue = [];

const handleQueuedRequests = (error, token= null) => {
   failedRequestsQueue.forEach((request) => {
       if (token)
           return request.resolve(token);
       else
           return request.reject(error);
   });
   failedRequestsQueue = [];
}

export const  secureAxiosConfig = axios.create({
    headers:{
        'Content-Type':'application/json',
    },
    baseURL:'http://localhost:8080/apis',
    withCredentials:true,
});

secureAxiosConfig.interceptors.response.use((response) => {
        console.log("response intercepted.", response);
    return response;
},
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            console.info("Error info ",error.response)
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({resolve, reject});
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return secureAxiosConfig(originalRequest);
                }).catch((error) => {
                    return new Promise.reject(error);
                })
            }

            originalRequest._retry = true;
            isRefreshing = true;

            //try refreshing the token
            try {
                console.log("refreshing the token")
                /*Request to refresh the token.*/
                const response = await axiosConfigFreeAPI.put("/refresh");
                console.log("server response", response);
                console.log("Refresh response.",response.data);
                const {token, userId, userRole} = response.data;

                /*dispatch an action to update the old accessToken*/
                store.dispatch(updateToken({accessToken: token, userId, userRole}));

                originalRequest.headers.Authorization = `${token}`;

                //handle queued requests after a successful token refresh.
                handleQueuedRequests(null, token);

                return secureAxiosConfig(originalRequest);
            } catch (error) {
                //handle queued requests after a failed token refresh.
                handleQueuedRequests(error, null);

                //handle user logout.
                store.dispatch(userLogout());

                //clear the persisted data in the session storage.
                await persistor.purge();

                return new Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }
        return new Promise.reject(error);
    });



secureAxiosConfig.interceptors.request.use(
    config => {
        console.log(config)
        return config
    },
    error => {
        return Promise.reject(error);
    }
);
