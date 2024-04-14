"use client";
import ReactQueryProvider from "@/providers/react-query-provider";
import ThemeProvider from "@/providers/theme-provider";
import { PropsWithChildren } from "react";
import { SaleInvoiceStoreContextProvider } from "@/providers/sale-invoice-store-provider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";

const BaseLayout = ({ children }: PropsWithChildren) => {
    const { systemTheme, theme } = useTheme();
    console.log(systemTheme, theme);
    return (
        <ReactQueryProvider>
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
        </ReactQueryProvider>
    );
};

export default BaseLayout;
