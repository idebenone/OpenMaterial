/**
 * Interface to create a workspace.
 */
export interface CreateWorkspace {
    workspace_name: string;
    workspace_description: string;
    is_private: boolean;
}

/**
 * Interface to create a folder in workspace.
 */
export interface CreateFolder {
    workspace_id: string;
    parent_id?: string;
    folder_name: string;
}

/**
 * Interface to create a file in workspace.
 */
export interface CreateFile {
    workspace_id: string;
    folder_id: string;
    file_name: string;
}

export interface WorkspaceDirectoryResponse {
    folder_id: string;
    folder_name: string;
    parent_id: string | null;
    workspace_id: string;
    createdAt: string;
    updatedAt: string;
    files: Array<{
        file_id: string;
        file_name: string;
        file_content: string | null;
        folder_id: string;
        workspace_id: string;
        createdAt: string;
        updatedAt: string;
    }>;
    sub_folders: WorkspaceDirectoryResponse[];
}