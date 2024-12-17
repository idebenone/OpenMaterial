import { Request, Response } from "express";
import { User } from "../models";
import RESPONSE from "../utils/responses";

const getUserData = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ where: { id: res.locals.user_id } })
        if (!user) {
            return res.status(404).json(RESPONSE.NOT_FOUND)
        }
        return res.status(200).json(RESPONSE.OK("", user))
    } catch (error) {
        console.log(error)
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR);
    }
}

const userOnboarding = async (req: Request, res: Response) => {
}



export { getUserData, userOnboarding };