import { Request, Response, NextFunction } from "express";
import RESPONSE from "../utils/responses";
import { Token, User } from "../models";

const getGithubToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await Token.findOne({
            where: {
                user_id: res.locals.user_id
            },
            include: [
                {
                    model: User,
                    as: 'user'
                }
            ]
        })
        if (!token?.access_token) {
            return res.status(404).json(RESPONSE.NOT_FOUND("Look's like you haven't connected to Githubb yet!"))
        }
        res.locals.gh_token = token.access_token;
        res.locals.gh_owner = token.user.gh_username;
        next();
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR)
    }
}

export default getGithubToken;