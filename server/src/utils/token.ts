import jwt from "jsonwebtoken";

export const generateJWT = (payload: {
    user_id: string,
    email: string,
    pfp: string
}): string => {
    const token = jwt.sign(
        { payload, time: new Date().getTime() },
        "secret auth",
        { expiresIn: '1d' }
    )
    return token;
}

export const verifyJWT = (token: string) => {
    const decoded = jwt.verify(token, "secret auth");
    return decoded;
}