import express, { Request, Response } from "express";
import { authentication_GITHUB } from "../services/authServices";

const AUTH = express();

/**
 * Authenticates user through GitHub flow.
 */
AUTH.get("/github", async (req: Request, res: Response) => {
    await authentication_GITHUB(req, res);
})

export default AUTH;