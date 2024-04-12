"use client";
import ReactQueryProvider from "@/providers/react-query-provider";
import ThemeProvider from "@/providers/theme-provider";
import { PropsWithChildren } from "react";
import { SaleInvoiceStoreContextProvider } from "@/providers/sale-invoice-store-provider";

const BaseLayout = ({ children }: PropsWithChildren) => {
    return (
        <ReactQueryProvider>
            <ThemeProvider>
                <SaleInvoiceStoreContextProvider>{children}</SaleInvoiceStoreContextProvider>
            </ThemeProvider>
        </ReactQueryProvider>
    );
};

export default BaseLayout;
