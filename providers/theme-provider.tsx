"use client";

import { type ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useTheme } from "next-themes";

type ThemePrefs = {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
  resolvedTheme: string | undefined;
};

export function useThemePrefs(): ThemePrefs {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    resolvedTheme,
  };
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider(props: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={["light", "dark"]}
      disableTransitionOnChange={false}
    >
      {props.children}
    </NextThemesProvider>
  );
}