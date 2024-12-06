import { CreateFile, CreateFolder, CreateWorkspace } from "@/lib/interface";
import axios, { AxiosResponse } from "axios"

export const getWorkspaces = async (): Promise<AxiosResponse> => {
    return axios.get(`/api/workspace`)
}

/**
 * Creates a new workspace.
 * @param data {@link CreateWorkspace}
 * @returns 
 */
export const createWorkspace = async (data: CreateWorkspace): Promise<AxiosResponse> => {
    return axios.post(`/api/workspace`, data);
}

/**
 * Fetches the directory of a workspace.
 * @param id - string 
 * @returns 
 */
export const fetchWorkspaceDirectory = async (id: string): Promise<AxiosResponse> => {
    return axios.get(`/api/workspace/${id}`);
}

/**
 * Creates a folder in workspace.
 * @param data {@link CreateFolder}
 * @returns 
 */
export const createFolderInWorkspace = async (data: CreateFolder): Promise<AxiosResponse> => {
    return axios.post(`/api/workspace/folder`, data);
}

/**
 * Creates a file in workspace.
 * @param data {@link CreateFile}
 * @returns 
 */
export const createFileInWorkspace = async (data: CreateFile): Promise<AxiosResponse> => {
    return axios.post(`/api/workspace/file`, data)
}

/**
 * Saves a file content to a file.
 * @param data 
 * @returns 
 */
export const saveFileContent = async (data: { file_id: string, file_content: string }) => {
    return axios.post(`/api/workspacefile/data`, data)
}

export const deleteItemInWorkspace = async () => {

}

export const renameFileFolder = async () => {

}