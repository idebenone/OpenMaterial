import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { File } from "../models/fileModel";
import { Folder, FolderAttributes } from "../models/folderModel";
import { Workspace } from "../models/workspaceModel";

import RESPONSE from "../utils/responses";
import { createRepository, deleteRepository } from "../utils/github";
import { Token, User } from "../models";

/**
 * Get all workspaces for an user.
 * @source SERVER
 * @param req 
 * @param res 
 * @returns 
 */
const getAllWorkspaces = async (req: Request, res: Response) => {
    try {
        const workspaces = await Workspace.findAll({ where: { user_id: res.locals.user_id } });
        return res.status(200).json(RESPONSE.OK("", workspaces));
    } catch (error) {
        console.error("Error creating workspace:", error);
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR);
    }
}

/**
 * Creates a workspace in Github and on server. 
 * @destination SERVER & GITHUB
 * @param req 
 * @param res 
 * @returns 
 */
const createWorkspace = async (req: Request, res: Response) => {
    const { workspace_name, workspace_description, is_private } = req.body;
    if (!workspace_name || !workspace_description) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY);
    try {
        /**
        * Create a repository on Github.
        */
        const repositoryResponse = await createRepository(res.locals.gh_token, {
            owner: res.locals.gh_owner,
            name: workspace_name,
            description: workspace_description,
            include_all_branches: true,
            private: is_private
        })
        /**
         * Create a workspace on server.
         */
        await Workspace.create(
            { user_id: res.locals.user_id, workspace_name, workspace_description, is_private },
        );

        return res.status(201).json(RESPONSE.CREATED('', ""))
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR);
    }
};

/**
 * Delete workspace from server and Github.
 * @param req 
 * @param res 
 * @returns 
 */
const deleteWorkspace = async (req: Request, res: Response) => {
    const { workspace_name } = req.body;
    if (!workspace_name) res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY);
    try {
        await Workspace.destroy({
            where: { workspace_id: res.locals.workspace_id },
        });

        await deleteRepository(res.locals.gh_token, {
            owner: res.locals.gh_owner,
            repo: workspace_name
        })

        return res.status(200).json(RESPONSE.OK("Workspace and its contents deleted successfully"));
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR);
    }
};

/**
 * Fetches entire file directory of a workspace.
 * @param req 
 * @param res 
 * @returns 
 */
const getFileDirectory = async (req: Request, res: Response) => {
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
            where: { workspace_id: res.locals.workspace_id, parent_id: null },
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

        return res.status(200).json(RESPONSE.OK("", result[0]))
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
    const { file_name, folder_id } = req.body;
    if (!file_name || !folder_id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY);
    try {
        const newFile = await File.create({ file_id: uuidv4(), file_name, folder_id, workspace_id: res.locals.workspace_id })
        newFile.save();
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
    const { folder_name, parent_id } = req.body;
    if (!folder_name) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY);
    try {
        const newFolder = await Folder.create({ folder_id: uuidv4(), folder_name, parent_id: parent_id ? parent_id : null, workspace_id: res.locals.workspace_id })
        newFolder.save();
        return res.status(201).json(RESPONSE.CREATED);
    } catch (error) {
        console.log(error)
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR);
    }
}

/**
 * Deletes a folder and children.
 * @param req 
 * @param res 
 * @returns 
 */
const deleteFolder = async (req: Request, res: Response) => {
    const folder_id = req.params.folder_id;
    if (!folder_id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY);

    const transaction = await Folder.sequelize?.transaction();
    try {
        const folders = await Folder.findAll({
            where: {
                folder_id, workspace_id: res.locals.workspace_id
            },
            transaction,
        });
        const folderIds = folders.map(folder => folder.folder_id)
        if (folderIds.length !== 0) {
            await File.destroy({
                where: {
                    folder_id: folderIds,
                    workspace_id: res.locals.workspace_id
                },
                transaction,
            });
        }
        await Folder.destroy({
            where: {
                folder_id, workspace_id: res.locals.workspace_id
            }
        })
        return res.status(204).json(RESPONSE.NO_CONTENT);
    } catch (error) {
        console.log(error)
        await transaction?.rollback();
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR);
    }
}

/**
 * Deletes a file.
 * @param req 
 * @param res 
 * @returns 
 */
const deleteFile = async (req: Request, res: Response) => {
    const file_id = req.params.file_id;
    if (!file_id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY);
    try {
        await File.destroy({
            where: {
                file_id: file_id,
                workspace_id: res.locals.workspace_id
            }
        })
        return res.status(204).json(RESPONSE.NO_CONTENT);
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
                    $file_id$: file_id,
                    workspace_id: res.locals.workspace_id
                }
            }
        )
        return res.status(200).json(RESPONSE.OK);
    } catch (error) {
        console.log(error);
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR);
    }

}

export {
    createFile,
    createFolder,
    createWorkspace,
    deleteFile,
    deleteFolder,
    deleteWorkspace,
    getAllWorkspaces,
    getFileDirectory,
    saveFileContent
};