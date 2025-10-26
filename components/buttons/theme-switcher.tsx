import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  if (!mounted) {
    return (
      <Button>
        <span className="w-4 h-4" /> 
      </Button>
    );
  }

  return (
    <Button onClick={toggleTheme}>
      {resolvedTheme === "dark" ? "☀️" : "🌙"}
    </Button>
  );
}