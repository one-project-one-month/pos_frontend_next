import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { PropsWithChildren } from "react";

function MainLayout({ children }: PropsWithChildren) {
    return (
        <main className="flex items-start">
            <Sidebar />
            <div className="grow">
                <Navbar />
                <div className="px-6">{children}</div>
            </div>
        </main>
    );
}

export default MainLayout;
