"use client";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const queryClient = new QueryClient();

interface Props extends PropsWithChildren {
    session: Session | null;
}
function ReactQueryProvider({ children, session }: Props) {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </SessionProvider>
    );
}

export default ReactQueryProvider;
