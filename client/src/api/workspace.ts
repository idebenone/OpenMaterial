import { CreateFile, CreateFolder, CreateWorkspace } from "@/lib/interface";
import axios, { AxiosResponse } from "axios"

/**
 * Get all existing workspaces.
 * @returns 
 */
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
 * Deletes a workspace along with files and folders.
 * @param workspace_id 
 * @returns 
 */
export const deleteWorkspace = async (workspace_id: string): Promise<AxiosResponse> => {
    return axios.delete(`/api/workspace/${workspace_id}`);
}

/**
 * Fetches the directory of a workspace.
 * @param id - string 
 * @returns 
 */
export const fetchWorkspaceDirectory = async (workspace_id: string): Promise<AxiosResponse> => {
    return axios.get(`/api/workspace/${workspace_id}`);
}

/**
 * Creates a folder in workspace.
 * @param data {@link CreateFolder}
 * @returns 
 */
export const createFolderInWorkspace = async (data: CreateFolder): Promise<AxiosResponse> => {
    return axios.post(`/api/workspace/${data.workspace_id}/folder`, data);
}

/**
 * Creates a file in workspace.
 * @param data {@link CreateFile}
 * @returns 
 */
export const createFileInWorkspace = async (data: CreateFile): Promise<AxiosResponse> => {
    return axios.post(`/api/workspace/${data.workspace_id}/file`, data)
}

/**
 * Saves a file content to a file.
 * @param data 
 * @returns 
 */
export const saveFileContent = async (data: { workspace_id: string, file_id: string, file_content: string }): Promise<AxiosResponse> => {
    return axios.post(`/api/workspace/${data.workspace_id}/file/data`, data)
}

/**
 * Deletes a folder from workspace.
 * @param data 
 * @returns 
 */
export const deleteFolderInWorkspace = async (data: { workspace_id: string, folder_id: string }): Promise<AxiosResponse> => {
    return axios.delete(`/api/workspace/${data.workspace_id}/folder/${data.folder_id}`)
}

/**
 * Deletes a file from workspace.
 * @param data 
 * @returns 
 */
export const deleteFileInWorkspace = async (data: { workspace_id: string, file_id: string }): Promise<AxiosResponse> => {
    return axios.delete(`/api/workspace/${data.workspace_id}/file/${data.file_id}`)
}

export const renameFileFolder = async () => {

}