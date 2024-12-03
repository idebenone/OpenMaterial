import express, { Request, Response } from "express"
import { userOnboarding } from "../services/userServices";

const USER = express();

USER.post("/onboarding", async (req: Request, res: Response) => {
    await userOnboarding(req, res);
})

export default USER;