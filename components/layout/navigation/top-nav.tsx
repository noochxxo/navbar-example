"use client";

import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavRoutes } from "@/hooks/use-nav-routes";
import { UserMenu } from "./user-menu";
import { MobileMenu } from "./mobile-menu";
import { CreateMenu } from "./create-menu";
import { NavButton } from "../../buttons/nav-button";
import { cn } from "@/lib/utils";
import { User } from "@/lib/validations/users";
import { Route } from "next";
import { ThemeSwitcher } from "../../buttons/theme-switcher";
import { APP_NAME } from "@/lib/constants";

interface TopNavProps {
  user: User;
}

export function TopNav({ user }: TopNavProps) {
  const routes = useNavRoutes(user);

  return (
    <header className="sticky px-3 py-4 top-0 z-40 border-b shadow-md bg-background backdrop-blur-sm flex flex-col sm:flex-row md:flex-col items-center">
      <Link
        href="/"
        className="w-full flex items-center justify-center mb-9 sm:mb-0 md:mb-8 gap-3 grid-rows-2"
      >
        <div className="flex flex-row items-center gap-2">
          <MessageCircleMore className="w-6 h-6 text-primary" />
          <h1 className="font-bold text-2xl md:text-4xl  text-primary">
            {APP_NAME}
          </h1>
        </div>
        <Badge
          variant="secondary"
          className="rounded-2xl hidden md:inline-flex"
        >
          DEI‑First
        </Badge>
      </Link>

      <div className="w-full flex flex-col justify-end">
        <Separator
          orientation="horizontal"
          className="hidden md:inline h-6 mx-1 mb-4"
        />
        <div className="w-full flex justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2 items-center justify-between">
            {routes.map((route) => (
              <NavButton
                key={route.href}
                href={`/${user.role}${route.href}` as Route}
                label={route.label}
                linkClassName="text-foreground"
                buttonClassName={cn(
                  // Start with everything hidden on md
                  "hidden",
                  // md: show only priority 1
                  route.priority === 1 && "md:inline-flex",
                  // lg: show priority 1-2
                  route.priority <= 2 && "lg:inline-flex",
                  // xl: show priority 1-3
                  route.priority <= 3 && "xl:inline-flex",
                  // 2xl: show all (priority 1-4+)
                  "2xl:inline-flex"
                )}
              />
            ))}
          </nav>

          <div className="flex ml-auto gap-2">
            <Separator
              orientation="vertical"
              className="hidden md:inline h-6 mx-1"
            />
            {/* Create Menu */}
            <CreateMenu user={user} />

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Theme Toggles */}
            {/* <ThemeToggles /> */}
            <ThemeSwitcher />

            {/* User Menu or Sign In */}
            {user ? (
              <UserMenu user={user} />
            ) : (
              <Link href="/">
                <Button>Sign In</Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <MobileMenu routes={routes} user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
