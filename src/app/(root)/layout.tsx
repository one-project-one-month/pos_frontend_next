import ReactQueryProvider from "@/providers/react-query-provider";
import { PropsWithChildren } from "react";

function MainLayout({ children }: PropsWithChildren) {
    return (
        <div>
            <ReactQueryProvider>{children}</ReactQueryProvider>
        </div>
    );
}

export default MainLayout;
