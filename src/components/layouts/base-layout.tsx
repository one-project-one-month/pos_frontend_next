"use client";

import ThemeProvider from "@/providers/theme-provider";
import { PropsWithChildren } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
interface Props extends PropsWithChildren {
    session: Session | null;
}
const BaseLayout = ({ children, session }: Props) => {
    console.log(session?.user?.email);

    return (
        <ThemeProvider>
            <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProvider>
    );
};

export default BaseLayout;
