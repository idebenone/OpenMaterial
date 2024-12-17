import { atomWithStorage } from 'jotai/utils'
import { Folder, User, WorkspaceFile } from "./types";
import { atom } from 'jotai';

export const UserAtom = atom<User | null>();

/**
 * File that is currently active in workspace.
 */
export const ActiveFileAtom = atom<WorkspaceFile>({
    file_id: "",
    file_name: "",
    file_content: ""
});

/**
 * All the files thare are opened in workspace
 */
export const WorkspaceFilesAtom = atom<WorkspaceFile[]>([])

/**
 * File directory of a workspace
 */
export const WorkspaceDirectoryAtom = atomWithStorage<Folder>('structure', {
    id: "",
    name: "",
    type: "folder",
    children: []
})