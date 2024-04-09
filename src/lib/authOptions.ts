import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db/prismaClient";

export default <AuthOptions>{
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@google.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log({ credentials });
                if (!credentials || !credentials.email) {
                    return null;
                }
                //   auth logic here

                const staff = await prisma.staff.findUnique({
                    where: {
                        staffCode: credentials.email,
                    },
                });
                if (!staff) {
                    return { id: "X1", email: "admin@admin" };
                }

                return { id: staff.staffId, email: staff.staffCode };
            },
        }),
    ],

    pages: {
        signIn: "/auth/sign-in",
        signOut: "/auth/sign-out",
    },
    secret: process.env.NEXTAUTH_SECRET as string,

    // callbacks: { authorized: ({ token }: any) => !!token },
};
