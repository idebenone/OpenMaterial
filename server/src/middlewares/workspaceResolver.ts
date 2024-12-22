import { Request, Response, NextFunction } from "express";
import RESPONSE from "../utils/responses";

/**
 * Middleware to resolve and validate the workspace_id parameter.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 * 
 * @returns If `workspace_id` is missing, responds with a 404 status and a message.
 * Otherwise, sets `workspace_id` in `res.locals` and calls the `next` middleware.
 */
const getWorkspaceId = (req: Request, res: Response, next: NextFunction) => {
    const workspace_id = req.params.workspace_id;
    if (!workspace_id) {
        return res.status(404).json(RESPONSE.NOT_FOUND("Couldn't find the workspace."));
    } else {
        res.locals.workspace_id = workspace_id;
        next();
    }
}

export default getWorkspaceId;
