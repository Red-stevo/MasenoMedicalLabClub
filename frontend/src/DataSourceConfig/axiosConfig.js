import axios from "axios";

const axiosConfigFreeAPI = axios.create({
    headers:{
        'Content-Type':'application/json',
    },
    baseURL:"http://localhost:8080/apis",
    withCredentials:true,
});

export default axiosConfigFreeAPI;

