import { Request, Response, NextFunction } from "express";
import { RESPONSE } from "src/utils/responses";
import { verifyJWT } from "src/utils/token";

const TokenValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const allowedOrigins = ["http://localhost:5372"];
    const origin = req.get("origin");
    var token = req.headers["x-access-token"];
    if (!token) res.status(401).json(RESPONSE.UN_AUTHORIZED());

    const decoded: any = verifyJWT(token as string);
    const getClient: any = ""

    if (getClient && getClient.is_verified == 1) {
        res.locals.user_id = decoded.user_id;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS,");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "origin, content-type, accept,x-access-token"
        );
        next();
    } else {
        res.status(401).json(RESPONSE.UN_AUTHORIZED());
    }
};

export default TokenValidator;
