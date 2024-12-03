import axios, { AxiosResponse } from "axios";

const generateDummyData = async (): Promise<AxiosResponse> => {
    return await axios.get("/api/gemini/generate-dummy");
}

const generateChartData = async (user_prompt: string): Promise<AxiosResponse> => {
    return await axios.post("/api/gemini/generate-map", { user_prompt })
}

export { generateDummyData, generateChartData };