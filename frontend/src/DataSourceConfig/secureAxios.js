import axios, {request} from "axios";
import axiosConfigFreeAPI from "./axiosConfig.js";
import {store} from "../ReduxStorage/Store.js";
import {updateToken} from "../ReduxStorage/LoginStore/LoginPageStore.js";

const secureAxios = ({token}) => {
    let isRefreshing = false;
    let failedRequestsQueue = [];


    const handleQueuedRequests = (error, token=null) => {
       failedRequestsQueue.forEach((request) => {
           if (token)
               return request.resolve(token);
           else
               return request.reject(error);
       });
       failedRequestsQueue = [];
    }

    const  axiosConfig = axios.create({
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization':`Bearer ${token}`
        },
    });

    axiosConfig.interceptors.response.use((response) => {
        return response;
    },
        async (error) => {
            const originalRequest = error.config;

            if(error.response && error.response.status === 401 && !originalRequest._retry){
                if (isRefreshing){
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
                    const {token, userId, userRole } = response.data;
                    store.dispatch(updateToken({accessToken:token, userId, userRole,}));

                    originalRequest.headers.Authorization = `${token}`;

                    //handle queued requests after a successful token refresh.
                    handleQueuedRequests(null, token);

                    return secureAxios(originalRequest);
                }catch (error) {
                    //handle queued requests after a failed token refresh.
                    handleQueuedRequests(error, token);

                    //handle user logout.

                    return Promise.reject(error);
                }finally {
                    isRefreshing = false;
                }
            }
            return Promise.reject(error);
        });
}
