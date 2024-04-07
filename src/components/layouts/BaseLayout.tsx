"use client";
import { BaseProps } from "@/types/baseType";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Header from "@/components/Header";

const BaseLayout = ({ children }: BaseProps) => {
    return (
        <ThemeProvider>
            <Header />
            {children}
        </ThemeProvider>
    );
};

export default BaseLayout;
