import express, { Request, Response } from "express";
import { createFile, createFolder, createWorkspace, deleteFile, deleteFolder, deleteWorkspace, getAllWorkspaces, getFileDirectory, saveFileContent } from "../services/workspaceServices";
import GetWorkspaceID from "../middlewares/workspaceResolver";
import TokenValidator from "../middlewares/tokenValidator";

const WORKSPACE = express();
WORKSPACE.use(TokenValidator)

/**
 * Get all existing workspaces for an user.
 */
WORKSPACE.get("/", async (req: Request, res: Response) => {
    await getAllWorkspaces(req, res);
})

/**
 * Create a new workspace.
 */
WORKSPACE.post("/", async (req: Request, res: Response) => {
    await createWorkspace(req, res);
})

/**
 * Deletes an existing workspace.
 */
WORKSPACE.delete("/:workspace_id", GetWorkspaceID, async (req: Request, res: Response) => {
    await deleteWorkspace(req, res);
})

/**
 * Fetch file directory.
 */
WORKSPACE.get("/:workspace_id", GetWorkspaceID, async (req: Request, res: Response) => {
    await getFileDirectory(req, res);
})

/**
 * Create a folder in a directory.
 */
WORKSPACE.post("/:workspace_id/folder", GetWorkspaceID, async (req: Request, res: Response) => {
    await createFolder(req, res);
})

/**
 * Create a file in a directory.
 */
WORKSPACE.post("/:workspace_id/file", GetWorkspaceID, async (req: Request, res: Response) => {
    await createFile(req, res);
})

/**
 * Update data in a file.
 */
WORKSPACE.post("/:workspace_id/file/data", GetWorkspaceID, async (req: Request, res: Response) => {
    await saveFileContent(req, res);
})

/**
 * Delete a folder.
 */
WORKSPACE.delete("/:workspace_id/folder/:folder_id", GetWorkspaceID, async (req: Request, res: Response) => {
    await deleteFolder(req, res);
})

/**
 * Delete a file.
 */
WORKSPACE.delete("/:workspace_id/file/:file_id", GetWorkspaceID, async (req: Request, res: Response) => {
    await deleteFile(req, res);
})

/**
 * Rename file/folder.
 */
WORKSPACE.put("/:workspace_id/rename/:file_id", GetWorkspaceID, async (req: Request, res: Response) => {

})

export default WORKSPACE;