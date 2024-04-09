import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "./theme-toggle";

export default function Header() {
    // let location = useLocation();

    // const matches = useMatches();
    // const title = matches
    //     .filter((match) => match.pathname === location.pathname)
    //     .map((match) => match.handle && match.handle.title);

    const title = "hello";

    return (
        <header className="sticky top-0 flex items-center justify-between divide-x divide-neutral-100 border-b border-b-neutral-200 bg-white px-4 py-3 dark:divide-neutral-700 dark:border-b-neutral-700 dark:bg-neutral-950">
            <div className="flex">
                <h1 className="mr-3 text-lg font-bold">{title} </h1>
            </div>
            <div className="flex">
                <div className="group flex cursor-pointer items-center gap-x-2 px-2">
                    <div>
                        <ThemeToggle />
                    </div>
                    <Avatar className="h-7 w-7">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <span className=" block text-xs group-hover:underline">Display name</span>
                        <span className=" block text-[10px] text-neutral-500">User name</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
