import { AxiosResponse } from "axios"
import axiosInstance from "@/lib/interceptor";
import { CreateFile, CreateFolder, CreateWorkspace } from "@/lib/interface";

/**
 * Get all existing workspaces.
 * @returns 
 */
export const getWorkspaces = async (): Promise<AxiosResponse> => {
    return axiosInstance.get(`/workspace`)
}

/**
 * Create a new workspace.
 * @param data {@link CreateWorkspace}
 * @returns 
 */
export const createWorkspace = async (data: CreateWorkspace): Promise<AxiosResponse> => {
    return axiosInstance.post(`/workspace`, data);
}

/**
 * Delete a workspace.
 * @param workspace_id 
 * @returns 
 */
export const deleteWorkspace = async (workspace_id: string): Promise<AxiosResponse> => {
    return axiosInstance.delete(`/workspace/${workspace_id}`);
}

/**
 * Update workspace.
 * @param workspace_id 
 * @param data 
 * @returns 
 */
export const updateWorkspace = async (workspace_id: string, data: any): Promise<AxiosResponse> => {
    return axiosInstance.patch(`/workspace/${workspace_id}`, data)
}

/**
 * Fetch workspace content.
 * @param workspace_id - string 
 * @returns 
 */
export const fetchWorkspaceDirectory = async (workspace_id: string, data: any): Promise<AxiosResponse> => {
    return axiosInstance.post(`/workspace/${workspace_id}`, data);
}

/**
 * Creates a folder in workspace.
 * @param data {@link CreateFolder}
 * @returns 
 */
export const createFolderInWorkspace = async (data: CreateFolder): Promise<AxiosResponse> => {
    return axiosInstance.post(`/workspace/${data.workspace_id}/folder`, data);
}

/**
 * Creates a file in workspace.
 * @param data {@link CreateFile}
 * @returns 
 */
export const createFileInWorkspace = async (data: CreateFile): Promise<AxiosResponse> => {
    return axiosInstance.post(`/workspace/${data.workspace_id}/file`, data)
}

/**
 * Saves a file content to a file.
 * @param data 
 * @returns 
 */
export const saveFileContent = async (data: { workspace_id: string, file_id: string, file_content: string }): Promise<AxiosResponse> => {
    return axiosInstance.post(`/workspace/${data.workspace_id}/file/data`, data)
}

/**
 * Deletes a folder from workspace.
 * @param data 
 * @returns 
 */
export const deleteFolderInWorkspace = async (data: { workspace_id: string, folder_id: string }): Promise<AxiosResponse> => {
    return axiosInstance.delete(`/workspace/${data.workspace_id}/folder/${data.folder_id}`)
}

/**
 * Deletes a file from workspace.
 * @param data 
 * @returns 
 */
export const deleteFileInWorkspace = async (data: { workspace_id: string, file_id: string }): Promise<AxiosResponse> => {
    return axiosInstance.delete(`/workspace/${data.workspace_id}/file/${data.file_id}`)
}

export const renameFileFolder = async () => {

}