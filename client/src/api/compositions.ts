import { CreateComposition } from "@/lib/interface"
import axios, { AxiosResponse } from "axios"

const fetchCompositions = async (): Promise<AxiosResponse> => {
    return await axios.get("/api/composition")
}

const fetchComposition = async (id: string): Promise<AxiosResponse> => {
    return await axios.get(`/api/composition/${id}`)
}

const createComposition = async (data: CreateComposition): Promise<AxiosResponse> => {
    return await axios.post(`/api/composition`, data)
}

export { fetchCompositions, fetchComposition, createComposition }