"use client";
import ReactQueryProvider from "@/providers/react-query-provider";
import ThemeProvider from "@/providers/theme-provider";
import { PropsWithChildren } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { SaleInvoiceStoreContextProvider } from "@/providers/sale-invoice-store-provider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";

interface Props extends PropsWithChildren {
    session: Session | null;
}
const BaseLayout = ({ children, session }: Props) => {
    const { systemTheme, theme } = useTheme();
    console.log(systemTheme, theme);
    return (
        <ReactQueryProvider>
            <SessionProvider session={session}>
                <ThemeProvider>
                    <SaleInvoiceStoreContextProvider>
                        {children}
                        <ProgressBar
                            height="4px"
                            color={"#1d4ed8"}
                            options={{ showSpinner: false }}
                            shallowRouting
                        />
                    </SaleInvoiceStoreContextProvider>
                </ThemeProvider>
            </SessionProvider>
        </ReactQueryProvider>
    );
};

export default BaseLayout;
