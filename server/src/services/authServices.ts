import { Request, Response } from "express";

import RESPONSE from "../utils/responses";
import generateHeaders from "../utils/github";
import { User } from "../models/userModel";
import { Token } from "../models/tokenModel";
import { where } from "sequelize";
import { generateJWT } from "../utils/token";
import { Session } from "../models/sessionModel";

interface AccessTokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    resfresh_token_expires_in: number;
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
    const clientId: string = "";
    const clientSecret: string = "";

    if (!code) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY);
    try {
        /**
         * Fetch the access token based on the code from callback.
         */
        const tokenResponse = await fetch(
            `https://github.com/login/oauth/access_token?code=${code}&client_id=${clientId}&client_secret=${clientSecret}`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
            }
        );
        const tokenData: AccessTokenResponse = await tokenResponse.json();
        if (!tokenData.access_token) {
            return res.status(400).json(RESPONSE.BAD_REQUEST);
        }
        console.log("Access Token:", tokenData);

        /**
         * Get user details from access_token.
         */
        const userResponse = await fetch(`https://api.github.com/user`, { headers: generateHeaders(tokenData.access_token) })
        const userData = await userResponse.json();
        if (!userData.email) {
            return res.status(400).json(RESPONSE.BAD_REQUEST);
        }
        console.log(userData);

        /**
         * If user already exist, update the relative token record, else insert a new row in both tables.
         */
        let user = await User.findOne({ where: { email: userData.email } });
        if (!user) {
            user = await User.create({
                email: userData.email,
                name: userData.name,
                pfp: userData.avatar_url
            })
        }

        let token = await Token.findOne({
            where: { user_id: user.id, token_name: "GitHub" },
        });

        if (!token) {
            token = await Token.create({
                user_id: user.id,
                token_name: "GitHub",
                access_token: tokenData.access_token,
                refresh_token: tokenData.refresh_token,
                access_expires_in: tokenData.expires_in,
                refresh_expires_in: tokenData.resfresh_token_expires_in,
            });
        } else {
            await Token.update({
                access_token: tokenData.access_token,
                refresh_token: tokenData.refresh_token,
                access_expires_in: tokenData.expires_in,
                refresh_expires_in: tokenData.resfresh_token_expires_in,
            }, {
                where: {
                    id: token.id
                }
            });
        }

        /**
         * Create/update a session and return jwt.
         */
        const session = await Session.findOne({ where: { user_id: user.id } })
        if (!session) {
            await Session.create({
                user_id: user.id,
                device: "dummy",
                ip: "dummy",
                location: "dummy"
            })
        } else {
            await Session.update({
                device: "dummy_2",
                ip: "ip_2",
                location: "location_2"
            }, {
                where: {
                    user_id: user.id
                }
            })
        }

        const jwt = generateJWT({
            user_id: user.id,
            email: user.email,
            pfp: user.pfp
        });

        res.status(200).json(RESPONSE.OK("", jwt));
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR);
    }
}

export { authentication_GITHUB }
