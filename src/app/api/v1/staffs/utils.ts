import bcrypt from "bcrypt";

export const hashPassword = async (pw: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pw, salt);
};
