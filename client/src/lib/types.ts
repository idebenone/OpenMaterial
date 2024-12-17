export type File = {
    id: string;
    name: string;
    content: string;
    type: 'file';
    children?: never;
}

export type Folder = {
    id: string;
    name: string;
    type: 'folder';
    children: Array<File | Folder>;
}

export type WorkspaceFile = {
    file_id: string,
    file_name: string,
    file_content: string
}

export type User = {
    id: string;
    name: string;
    email: string;
    pfp: string;
}

export type FileSystemItem = File | Folder;