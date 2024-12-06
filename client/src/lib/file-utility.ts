import { v4 as uuidv4 } from 'uuid';
import { WorkspaceDirectoryResponse } from './interface';
import { FileSystemItem, Folder } from "./types";

/**
 * Utility to create a FileSystemItem of type 'file'.
 * @param name 
 * @returns 
 */
export const createFile = (name: string): FileSystemItem => ({
    id: uuidv4(),
    name,
    type: 'file',
});

/**
 * Utility to create a FileSystemItem of type 'folder'.
 * @param name 
 * @returns 
 */
export const createFolder = (name: string): FileSystemItem => ({
    id: uuidv4(),
    name,
    type: 'folder',
    children: [],
});

/**
 * Utility to add a FileSystemItem to a folder.
 * @param folder 
 * @param item 
 * @returns 
 */
export const addItem = (folder: Folder, item: FileSystemItem): Folder => {
    return {
        ...folder,
        children: [...folder.children, item],
    };
};

/**
 * Utility to delete a FileSystemItem from a folder.
 * @param folder 
 * @param itemId 
 * @returns 
 */
export const deleteItem = (folder: Folder, itemId: string): Folder => {
    return {
        ...folder,
        children: folder.children.filter(item => item.id !== itemId),
    };
};

/**
 * Utiltiy to update a FileSystemItem.
 * @param folder 
 * @param itemId 
 * @param newName 
 * @returns 
 */
export const updateItemName = (
    folder: Folder,
    itemId: string,
    newName: string
): Folder => {
    if (folder.id === itemId) {
        return {
            ...folder,
            name: newName,
        };
    }

    return {
        ...folder,
        children: folder.children.map((child) => {
            if (child.id === itemId) {
                return {
                    ...child,
                    name: newName,
                };
            } else if (child.type === "folder") {
                return updateItemName(child as Folder, itemId, newName);
            }
            return child;
        }),
    };
};

/**
 * Utility to transform the server response into FileSystemItem.
 * @param structure 
 * @returns 
 */
export const transformStructure = (structure: WorkspaceDirectoryResponse): Folder => ({
    id: structure.folder_id,
    name: structure.folder_name,
    type: "folder",
    children: [
        ...structure.files.map((file): any => ({
            id: file.file_id,
            name: file.file_name,
            type: "file",
        })),
        ...structure.sub_folders.map(transformStructure),
    ],
})

/**
 * Utility to update a folder and its children recursively based on the provided update function.
 * @param folder
 * @param target_id
 * @param updateFn
 * @returns
 */
export const updateFolder = (
    folder: Folder,
    target_id: string,
    updateFn: (folder: Folder) => Folder
): Folder => {
    if (folder.id === target_id) {
        return updateFn(folder);
    }

    return {
        ...folder,
        children: folder.children.map((child) => {
            if (child.type === "folder") {
                return updateFolder(child as Folder, target_id, updateFn);
            }
            return child;
        }),
    };
};