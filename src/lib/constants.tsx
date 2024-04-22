import {
    BarChartBig,
    NotepadTextDashed,
    PackageSearch,
    SquareGanttChart,
    Store,
    UsersRound,
} from "lucide-react";
import { ReactNode } from "react";

export const routeLinks: {
    href: string;
    label: string;
    iconName: string;
    icon: ReactNode;
}[] = [
    {
        href: "/",
        label: "Store",
        iconName: "store",
        icon: <Store />,
    },
    {
        href: "/dashboard",
        label: "Dashboard",
        iconName: "layout-dashboard",
        icon: <BarChartBig />,
    },
    {
        href: "/products",
        label: "Products",
        iconName: "package-search",
        icon: <PackageSearch />,
    },
    {
        href: "/product-categories",
        label: "Product Categories",
        iconName: "square-gantt-chart",
        icon: <SquareGanttChart />,
    },
    {
        href: "/sale-invoices",
        label: "Sale Invoices",
        iconName: "notepad-text-dashed",
        icon: <NotepadTextDashed />,
    },
    {
        href: "/admin/staffs",
        label: "Staffs",
        iconName: "User",
        icon: <UsersRound />,
    },
];
