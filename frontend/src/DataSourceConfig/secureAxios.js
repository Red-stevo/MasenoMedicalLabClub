import axios from "axios";
import axiosConfigFreeAPI from "./axiosConfig.js";
import {store} from "../ReduxStorage/Store.js";
import {updateToken, userLogout} from "../ReduxStorage/LoginStore/LoginPageStore.js";

let isRefreshing = false;
let failedRequestsQueue = [];
const old_token = store.getState().accessToken;

const handleQueuedRequests = (error, token= null) => {
   failedRequestsQueue.forEach((request) => {
       if (token)
           return request.resolve(token);
       else
           return request.reject(error);
   });
   failedRequestsQueue = [];
}

export const  axiosConfig = axios.create({
    headers:{
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Authorization':`Bearer ${old_token}`
    },
    baseURL:'http://localhost:8080/apis',
    withCredentials:true,
});

axiosConfig.interceptors.response.use((response) => {
    return response;
},
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({resolve, reject});
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosConfig(originalRequest);
                }).catch((error) => {
                    return new Promise.reject(error);
                })
            }
            originalRequest._retry = true;
            isRefreshing = true;

            //try refreshing the token
            try {
                const response = await axiosConfigFreeAPI.put("/refresh");
                const {token, userId, userRole} = response.data;

                /*dispatch an action to update the old accessToken*/
                store.dispatch(updateToken({accessToken: token, userId, userRole,}));

                originalRequest.headers.Authorization = `${token}`;

                //handle queued requests after a successful token refresh.
                handleQueuedRequests(null, token);

                return axiosConfig(originalRequest);
            } catch (error) {
                //handle queued requests after a failed token refresh.
                handleQueuedRequests(error, null);

                //handle user logout.
                store.dispatch(userLogout());

                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    });

