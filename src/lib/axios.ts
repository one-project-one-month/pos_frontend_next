import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api/v1",
    timeout: 10000,
});

// axiosInstance.interceptors.response.use(
//     (config) => {
//         console.log(config.status);
//         return config;
//     },
//     (error) => {
//         console.log(error);
//     },
// );

export default axiosInstance;
