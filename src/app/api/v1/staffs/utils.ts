import type { Position } from "@prisma/client";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

type PayloadType = {
    staffCode: string;
    staffId: string;
    staffName: string;
    position: Position;
};

const jwtSecret = process.env.JWT_SECRET!;

export const generateToken = (payload: PayloadType) => {
    return jwt.sign(payload, jwtSecret, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export const decodeToken = (token: string) => {
    return jwt.verify(token, jwtSecret);
};

export const hashPassword = async (pw: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pw, salt);
};

export const comparePassword = async (pw: string, hashedPw: string) => {
    return await bcrypt.compare(pw, hashedPw);
};
