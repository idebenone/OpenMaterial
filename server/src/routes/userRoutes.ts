import express, { Request, Response } from "express"
import { getUserData, userOnboarding } from "../services/userServices";

const USER = express();

USER.get("/", async (req: Request, res: Response) => {
    await getUserData(req, res);
})

USER.post("/onboarding", async (req: Request, res: Response) => {
    await userOnboarding(req, res);
})

export default USER;