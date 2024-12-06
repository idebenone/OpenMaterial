import express, { Request, Response } from "express";
import { createFile, createFolder, createWorkspace, deleteWorkspace, getAllWorkspaces, getFileDirectory, saveFileContent } from "../services/workspaceServices";

const WORKSPACE = express();

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
WORKSPACE.delete("/:id", async (req: Request, res: Response) => {
    await deleteWorkspace(req, res);
})

/**
 * Fetch file directory.
 */
WORKSPACE.get("/:id", async (req: Request, res: Response) => {
    await getFileDirectory(req, res);
})

/**
 * Create a folder in a directory.
 */
WORKSPACE.post("/folder", async (req: Request, res: Response) => {
    await createFolder(req, res);
})

/**
 * Create a file in a directory.
 */
WORKSPACE.post("/file", async (req: Request, res: Response) => {
    await createFile(req, res);
})

/**
 * Update data in a file.
 */
WORKSPACE.post("/file/data", async (req: Request, res: Response) => {
    await saveFileContent(req, res);
})

/**
 * Delete a folder.
 */
WORKSPACE.delete("/folder/:id", async (req: Request, res: Response) => {

})

/**
 * Delete a file.
 */
WORKSPACE.delete("/file/:id", async (req: Request, res: Response) => {

})

/**
 * Rename file/folder.
 */
WORKSPACE.put("/rename/:id", async (req: Request, res: Response) => {

})

export default WORKSPACE;