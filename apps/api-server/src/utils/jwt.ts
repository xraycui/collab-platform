import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const ACCESS_TTL = process.env.JWT_ACCESS_TTL || "1h";
const REFRESH_TTL = process.env.JWT_REFRESH_TTL || "7d";

export const signAccessToken = (payload: object) => {
  jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TTL });
}

export const signRefreshToken = (payload: object, jti: string) => {
  jwt.sign({ ...payload, jti }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TTL });
}

export const verifyAccessToken = (token: string) => {
  jwt.verify(token, JWT_SECRET) as any;
}

export const verifyRefreshToken = (token: string) => {
  jwt.verify(token, JWT_REFRESH_SECRET) as any;
}

