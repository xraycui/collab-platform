import { Request, Response } from "express";
import { verifyRefreshToken, signAccessToken, signRefreshToken } from "../utils/jwt";
import { isRefreshTokenValid, revokeRefreshToken, storeRefreshToken } from "../services/tokenService";
import crypto from "crypto";

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "Missing refreshToken" });

    const decoded = verifyRefreshToken(refreshToken) as { id: number; email: string; jti: string };
    const valid = await isRefreshTokenValid(decoded.jti, decoded.id);
    if (!valid) return res.status(401).json({ error: "Invalid refresh token" });

    // Rotate: revoke old, issue new
    await revokeRefreshToken(decoded.jti);

    const payload = { id: decoded.id, email: decoded.email };
    const accessToken = signAccessToken(payload);

    const newJti = crypto.randomUUID();
    const newRefreshToken = signRefreshToken(payload, newJti);
    await storeRefreshToken(newJti, decoded.id);

    return res.json({ accessToken, refreshToken: newRefreshToken });
  } catch {
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "Missing refreshToken" });

    const decoded = verifyRefreshToken(refreshToken) as { jti: string };
    await revokeRefreshToken(decoded.jti);

    return res.json({ ok: true });
  } catch {
    return res.status(400).json({ error: "Invalid refresh token" });
  }
};
