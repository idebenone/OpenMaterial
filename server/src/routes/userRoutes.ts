import express, { Request, Response } from "express"
import { getUserData, userOnboarding } from "../services/userServices";
import TokenValidator from "../middlewares/tokenValidator";

const USER = express();
USER.use(TokenValidator)

USER.get("/", async (req: Request, res: Response) => {
    await getUserData(req, res);
})

USER.post("/onboarding", async (req: Request, res: Response) => {
    await userOnboarding(req, res);
})

export default USER;