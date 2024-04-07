"use client";
import { BaseProps } from "@/types/baseType";
import ThemeProvider from "@/providers/theme-provider";
import Header from "@/components/header";

const BaseLayout = ({ children }: BaseProps) => {
    return (
        <ThemeProvider>
            <Header />
            {children}
        </ThemeProvider>
    );
};

export default BaseLayout;
