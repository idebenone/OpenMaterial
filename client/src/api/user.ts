import { AxiosResponse } from "axios"
import axiosInstance from "@/lib/interceptor";

/**
 * Get user related data
 * @returns 
 */
export const getUser = async (): Promise<AxiosResponse> => {
    return axiosInstance.get("/user")
}