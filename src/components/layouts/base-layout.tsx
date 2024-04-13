"use client";
import ReactQueryProvider from "@/providers/react-query-provider";
import ThemeProvider from "@/providers/theme-provider";
import { PropsWithChildren } from "react";
import { SaleInvoiceStoreContextProvider } from "@/providers/sale-invoice-store-provider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";

interface Props extends PropsWithChildren {
    session: Session | null;
}
const BaseLayout = ({ children, session }: Props) => {
    const { theme } = useTheme();
    return (
        <ReactQueryProvider>
                <ThemeProvider>
                    <SaleInvoiceStoreContextProvider>
                        {children}
                        <ProgressBar
                            height="4px"
                            color={theme === "light" ? "#222" : "#eee"}
                            options={{ showSpinner: false }}
                            shallowRouting
                        />
                    </SaleInvoiceStoreContextProvider>
                </ThemeProvider>
        </ReactQueryProvider>
    );
};

export default BaseLayout;
