export interface CreateComposition {
    composition_name: string;
    composition_description: string
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