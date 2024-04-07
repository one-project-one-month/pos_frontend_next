import Navbar from "@/components/navbar";
import { PropsWithChildren } from "react";

function MainLayout({ children }: PropsWithChildren) {
    return (
        <main>
            <Navbar />
            <div className="px-6 py-4">{children}</div>
        </main>
    );
}

export default MainLayout;
