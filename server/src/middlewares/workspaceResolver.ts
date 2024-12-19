import { Request, Response, NextFunction } from "express";
import RESPONSE from "../utils/responses";

const getWorkspaceId = (req: Request, res: Response, next: NextFunction) => {
    const workspace_id = req.params.workspace_id;
    if (!workspace_id) {
        return res.status(404).json(RESPONSE.NOT_FOUND("Couldn't find the worksapce."))
    } else {
        res.locals.workspace_id = workspace_id;
        next();
    }
}

export default getWorkspaceId;