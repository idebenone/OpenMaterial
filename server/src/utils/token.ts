import jwt from "jsonwebtoken";

export const generateJWT = (user_id: number | string): string => {
    const token = jwt.sign(
        { user_id, time: new Date().getTime() },
        "secret auth",
        { expiresIn: '1d' }
    )
    return token;
}

export const verifyJWT = (token: string) => {
    const decoded = jwt.verify(token, "secret auth");
    return decoded;
}