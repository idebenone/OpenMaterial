export interface CreateComposition {
    composition_name: string;
    composition_description: string
}

export interface CreateWorkspace {
    user_id: string;
    workspace_name: string;
    workspace_description: string;
}

export interface CreateFolder {
    workspace_id: string;
    parent_id?: string;
    folder_name: string;
}

export interface CreateFile {
    workspace_id: string;
    folder_id: string;
    file_name: string;
}
export interface File {
    id: string;
    name: string;
    type: 'file';
}

export interface Folder {
    id: string;
    name: string;
    type: 'folder';
    children: Array<File | Folder>;
}

export interface WorkspaceFile {
    file_id: string,
    file_name: string,
    file_content: string
}

export type FileSystemItem = File | Folder;