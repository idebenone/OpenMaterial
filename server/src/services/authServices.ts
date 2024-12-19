import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import RESPONSE from "../utils/responses";
import { getTokenResponse, getUserData } from "../utils/github";
import { User } from "../models/userModel";
import { Token } from "../models/tokenModel";
import { generateJWT } from "../utils/token";
import { Session } from "../models/sessionModel";

interface AccessTokenResponse {
    access_token: string;
    scope: string;
    token_type: string;
}

/**
 * Authenticates user through GitHub flow.
 * @param req 
 * @param res 
 * @returns 
 */
const authentication_GITHUB = async (req: Request, res: Response) => {
    const code = req.params.code;
    const clientId: string = process.env.GITHUB_CLIENT_ID!;
    const clientSecret: string = process.env.GITHUB_CLIENT_SECRET!;

    if (!code) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY);

    const transaction = await User.sequelize?.transaction();

    try {
        /**
         * Fetch the access token based on the code from callback.
         */
        const tokenResponse = await getTokenResponse(code, clientId, clientSecret);
        const tokenData: AccessTokenResponse = await tokenResponse.json();
        if (!tokenData.access_token) {
            return res.status(400).json(RESPONSE.BAD_REQUEST);
        }

        /**
         * Get user details from access_token.
         */
        const userResponse = await getUserData(tokenData.access_token);
        const userData = await userResponse.json();
        if (!userData.email) {
            return res.status(400).json(RESPONSE.BAD_REQUEST);
        }

        /**
         * If user already exists, update the relative token record, else insert a new row in both tables.
         */
        let user = await User.findOne({ where: { email: userData.email }, transaction });

        if (!user) {
            user = await User.create(
                {
                    email: userData.email,
                    name: userData.name,
                    pfp: userData.avatar_url,
                    gh_username: userData.login
                },
                { transaction }
            );
        }

        let token = await Token.findOne({
            where: { user_id: user.id, token_name: "GitHub" },
            transaction,
        });

        if (!token) {
            await Token.create(
                {
                    user_id: user.id,
                    token_name: "GitHub",
                    access_token: tokenData.access_token,
                },
                { transaction }
            );
        } else {
            await Token.update(
                {
                    access_token: tokenData.access_token,
                },
                {
                    where: { token_id: token.token_id },
                    transaction,
                }
            );
        }

        /**
         * Create/update a session.
         */
        const session = await Session.findOne({ where: { user_id: user.id }, transaction });

        if (!session) {
            await Session.create(
                {
                    user_id: user.id,
                    device: "dummy",
                    ip: "dummy",
                    location: "dummy",
                },
                { transaction }
            );
        } else {
            await Session.update(
                {
                    device: "dummy_2",
                    ip: "ip_2",
                    location: "location_2",
                },
                {
                    where: { user_id: user.id },
                    transaction,
                }
            );
        }

        /**
         * Generate and return JWT.
         */
        const jwt = generateJWT({
            user_id: user.id,
            email: user.email,
            pfp: user.pfp,
        });

        await transaction?.commit();

        res.status(200).json(RESPONSE.OK("", jwt));
    } catch (error) {
        console.log(error)
        await transaction?.rollback();
        res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR);
    }
};


export { authentication_GITHUB }
