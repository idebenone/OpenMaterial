import express, { Request, Response } from "express";
import { createFile, createFolder, createWorkspace, deleteFile, deleteFolder, deleteWorkspace, getAllWorkspaces, getWorkspaceContent, saveFileContent, updateWorkspace } from "../services/workspaceServices";
import getWorkspaceId from "../middlewares/workspaceResolver";
import tokenValidator from "../middlewares/tokenValidator";

const WORKSPACE = express();
WORKSPACE.use(tokenValidator)

/**
 * Get all existing workspaces for an user.
 */
WORKSPACE.get("/", async (req: Request, res: Response) => {
    await getAllWorkspaces(req, res);
})

/**
 * Create a new workspace.
 * @typedef {Object} - req.body
 * @property {string} workspace_name
 * @property {string} workspace_description
 * @property {boolean} is_private
 */
WORKSPACE.post("/", async (req: Request, res: Response) => {
    await createWorkspace(req, res);
})

/**
 * Delete an existing workspace.
 * @typedef {Object} - req.body
 * @property {string} workspace_name
 */
WORKSPACE.delete("/:workspace_id", getWorkspaceId, async (req: Request, res: Response) => {
    await deleteWorkspace(req, res);
})

/**
 * Update an exisiting workspace.
 * @typedef {Object} - req.body
 * @property {string} old_workspace_name
 * @property {string} workspace_name
 * @property {string} workspace_description
 * @property {boolean} is_private
 */
WORKSPACE.patch("/:workspace_id", getWorkspaceId, async (req: Request, res: Response) => {
    await updateWorkspace(req, res);
})

/**
 * Fetch repository content
 * @typedef {Object} - req.body
 * @property {string} workspace_name
 * @property {string} path
 */
WORKSPACE.post("/:workspace_id", getWorkspaceId, async (req: Request, res: Response) => {
    await getWorkspaceContent(req, res);
})

/**
 * Create a folder in a directory.
 */
WORKSPACE.post("/:workspace_id/folder", getWorkspaceId, async (req: Request, res: Response) => {
    await createFolder(req, res);
})

/**
 * Create a file in a directory.
 */
WORKSPACE.post("/:workspace_id/file", getWorkspaceId, async (req: Request, res: Response) => {
    await createFile(req, res);
})

/**
 * Update data in a file.
 */
WORKSPACE.post("/:workspace_id/file/data", getWorkspaceId, async (req: Request, res: Response) => {
    await saveFileContent(req, res);
})

/**
 * Delete a folder.
 */
WORKSPACE.delete("/:workspace_id/folder/:folder_id", getWorkspaceId, async (req: Request, res: Response) => {
    await deleteFolder(req, res);
})

/**
 * Delete a file.
 */
WORKSPACE.delete("/:workspace_id/file/:file_id", getWorkspaceId, async (req: Request, res: Response) => {
    await deleteFile(req, res);
})

/**
 * Rename file/folder.
 */
WORKSPACE.put("/:workspace_id/rename/:file_id", getWorkspaceId, async (req: Request, res: Response) => {

})

export default WORKSPACE;