import { PrismaClient, Staff } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export const exclude = (user: Staff, ...keys: (keyof Staff)[]) => {
    for (let key of keys) {
        delete user[key];
    }
    return user;
};
export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
