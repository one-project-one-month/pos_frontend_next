"use client";

import { BaseProps } from "@/types/baseType";
import ThemeProvider from "../providers/ThemeProvider";

const BaseLayout = ({ children }: BaseProps) => {
    return <ThemeProvider>{children}</ThemeProvider>;
};

export default BaseLayout;
