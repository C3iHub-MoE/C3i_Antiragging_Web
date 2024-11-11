import apiClient from "../config";
import { constants } from "../../utils/constant";

export const loginUser = async (payload, signal) => {
    const response = await apiClient.get(``, payload, { signal });
    return response.data;
}