"use client";
import ReactQueryProvider from "@/providers/react-query-provider";
import ThemeProvider from "@/providers/theme-provider";
import { PropsWithChildren } from "react";
import { SaleInvoiceStoreContextProvider } from "@/providers/sale-invoice-store-provider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "@/components/ui/sonner";
// import { useTheme } from "next-themes";

const Providers = ({ children }: PropsWithChildren) => {
    // const { theme } = useTheme();
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
                    <Toaster position="top-center" duration={800} />
                </SaleInvoiceStoreContextProvider>
            </ThemeProvider>
        </ReactQueryProvider>
    );
};

export default Providers;
