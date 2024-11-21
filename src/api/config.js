import axios from "axios";
import { constants } from "../utils/constant";
import { notifyError } from "../utils/toastUtil";

const apiClient = axios.create({
    baseURL: constants.API_BASE_URL
})

apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        notifyError("Request error: " + error.message)
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(

    (response) => {
        return response;
    },
    (error) => {
        // const errorMessage = error.response
        notifyError("Request error: " + error.message)
        return Promise.reject(error);
    }
)

export default apiClient;