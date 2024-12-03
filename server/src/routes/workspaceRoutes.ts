import express, { Request, Response } from "express";
import { createFile, createFolder, getFileDirectory, saveFileContent } from "../services/workspaceServices";

const WORKSPACE = express();

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