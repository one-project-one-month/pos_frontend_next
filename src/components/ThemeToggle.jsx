import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    console.log(theme);
    return (
        <Button
            onClick={() => setTheme(theme === "system" || theme === "light" ? "dark" : "light")}
            variant="ghost"
            size="icon"
            // className="h-8 w-8"
        >
            {theme === "light" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
        </Button>
    );
}

export default ThemeToggle;
