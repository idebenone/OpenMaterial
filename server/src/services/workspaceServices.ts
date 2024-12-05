import { Request, response, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { File } from "../models/fileModel";
import { Folder, FolderAttributes } from "../models/folderModel";
import { RESPONSE } from "../utils/responses";

/**
 * Creates a workspace. 
 * @param req 
 * @param res 
 * @returns 
 */
const createWorkspace = async (req: Request, res: Response) => {
    const { user_id, workspace_name, workspace_description } = req.body();
    if (!user_id || !workspace_name || !workspace_description) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY);

    /**
     * Create a workspace and assign a folder with a file containing welcome text.
     */

}

/**
 * Fetches entire file directory of a workspace.
 * @param req 
 * @param res 
 * @returns 
 */
const getFileDirectory = async (req: Request, res: Response) => {
    const workspace_id = req.params.id
    if (!workspace_id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY);
    try {
        const getFolderRecursive = async (folderId: string) => {
            const folder = await Folder.findByPk(folderId, {
                include: [
                    { model: File, as: 'files' },
                    { model: Folder, as: 'sub_folders', include: ['files', 'sub_folders'] }
                ]
            });

            if (!folder) {
                return null;
            }

            const folderData = folder.toJSON() as FolderAttributes;
            for (const subfolder of folderData.sub_folders || []) {
                const nestedSubfolder = await getFolderRecursive(subfolder.folder_id);
                subfolder.sub_folders = nestedSubfolder ? nestedSubfolder.sub_folders : [];
                subfolder.files = nestedSubfolder ? nestedSubfolder.files : [];
            }

            return folderData;
        };

        const rootFolders = await Folder.findAll({
            where: { workspace_id, parent_id: null },
            include: [
                { model: File, as: 'files' },
                { model: Folder, as: 'sub_folders', include: ['files', 'sub_folders'] }
            ]
        });

        const result = [];
        for (const rootFolder of rootFolders) {
            const nestedFolder = await getFolderRecursive(rootFolder.folder_id);
            result.push(nestedFolder);
        }

        return res.status(200).json(RESPONSE.OK("", result))
    } catch (error) {
        console.log(error)
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR);
    }
}

/**
 * Create a file in workspace.
 * @param req 
 * @param res 
 * @returns 
 */
const createFile = async (req: Request, res: Response) => {
    const { file_name, folder_id, workspace_id } = req.body;
    if (!file_name || !folder_id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY);
    try {
        await File.create({ file_id: uuidv4(), file_name, folder_id, workspace_id })
        return res.status(201).json(RESPONSE.CREATED);
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR);
    }
}

/**
 * Create a folder in workspace.
 * @param req 
 * @param res 
 * @returns 
 */
const createFolder = async (req: Request, res: Response) => {
    const { folder_name, parent_id, workspace_id } = req.body;
    if (!folder_name || !workspace_id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY);
    try {
        await Folder.create({ folder_id: uuidv4(), folder_name, parent_id: parent_id ? parent_id : null, workspace_id })
        return res.status(201).json(RESPONSE.CREATED);
    } catch (error) {
        console.log(error)
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR);
    }
}

/**
 * Save content to a file.
 * @param req 
 * @param res 
 * @returns 
 */
const saveFileContent = async (req: Request, res: Response) => {
    const { file_id, file_content } = req.body;
    if (!file_id || !file_content) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY);
    try {
        await File.update(
            { file_content },
            {
                where: {
                    $file_id$: file_id
                }
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR);
    }

}

export { getFileDirectory, createFile, createFolder, saveFileContent };