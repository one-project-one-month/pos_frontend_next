import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default <AuthOptions>{
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
    ],
    pages: {
        signIn: "/auth/sign-in",
        signOut: "/auth/sign-out",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: { authorized: ({ token }: any) => !!token },
};
