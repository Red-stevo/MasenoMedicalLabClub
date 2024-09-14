import axios from "axios";

const axiosConfigFreeAPI = axios.create({
    headers:{
        'Content-Type':'application/json',
        'Accept':'application/json',
    },
    baseURL:"http://localhost:8080/api"
});

export default axiosConfigFreeAPI;

