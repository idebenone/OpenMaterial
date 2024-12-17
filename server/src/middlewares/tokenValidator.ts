import { Request, Response, NextFunction } from "express";
import RESPONSE from "../utils/responses";
import { verifyJWT } from "../utils/token";

const TokenValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const allowedOrigins = ["http://localhost:5372"];
    const origin = req.get("origin");
    const token = req.headers["x-access-token"] as string;

    if (!token) return res.status(401).json(RESPONSE.UN_AUTHORIZED());
    try {
        const decoded: any = verifyJWT(token);
        if (decoded.user_id) {
            res.locals.user_id = decoded.user_id;
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.setHeader(
                "Access-Control-Allow-Headers",
                "origin, content-type, accept, x-access-token"
            );
            return next();
        }
    } catch (error) {
        return res.status(401).json(RESPONSE.UN_AUTHORIZED());
    }
    return res.status(401).json(RESPONSE.UN_AUTHORIZED());
};

export default TokenValidator;
