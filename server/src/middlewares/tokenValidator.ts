import { Request, Response, NextFunction } from "express";
import RESPONSE from "../utils/responses";
import { verifyJWT } from "../utils/token";

/**
 * Middleware to verify the validity of the provided JWT token.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the pipeline.
 * 
 * @returns {Response} If the token is invalid or missing, responds with a 401 status.
 * Otherwise, sets the user ID in `res.locals` and proceeds to the next middleware.
 */
const tokenValidator = (req: Request, res: Response, next: NextFunction) => {
    const allowedOrigins = ["http://localhost:5372"];
    const origin = req.get("origin");
    const token = req.headers["x-access-token"] as string | undefined;

    // Check if the token is provided
    if (!token) {
        return res.status(401).json(RESPONSE.UN_AUTHORIZED());
    }

    try {
        // Verify the token
        const decoded: any = verifyJWT(token);
        if (decoded && decoded.user_id) {
            res.locals.user_id = decoded.user_id;

            // Set CORS headers
            if (origin && allowedOrigins.includes(origin)) {
                res.setHeader("Access-Control-Allow-Origin", origin);
            }
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.setHeader(
                "Access-Control-Allow-Headers",
                "Origin, Content-Type, Accept, x-access-token"
            );

            return next();
        }
    } catch (error) {
        // Handle token verification errors
        return res.status(401).json(RESPONSE.UN_AUTHORIZED());
    }

    // Fallback in case no valid token is provided
    return res.status(401).json(RESPONSE.UN_AUTHORIZED());
};

export default tokenValidator;
