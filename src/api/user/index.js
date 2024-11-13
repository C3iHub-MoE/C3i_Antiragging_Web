import apiClient from "../config";
import { constants } from "../../utils/constant";

export const loginUser = async (payload, signal) => {
    const response = await apiClient.post(constants.API_URLS.USER_LOGIN, payload, { signal });
    return response.data?.data;
}
