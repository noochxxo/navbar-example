"use client";

import { useState } from "react";
import { Menu, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "./user-avatar";
import { NavButton } from "../../buttons/nav-button";
import type { NavRoute } from "@/config/navigation.config";
import { cn, hasAnyRole } from "@/lib/utils";
import { User, UserRole } from "@/lib/validations/users";
import { LinkButton } from "../../buttons/link-button";
import { MobileSignOutButton } from "../../buttons/sign-out-button";
import { Route } from "next";

interface MobileMenuProps {
  routes: NavRoute[];
  user: User;
}

export function MobileMenu({ routes, user }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const canCreateClass = hasAnyRole(user, ["admin", "moderator"]);
  const isModerator = hasAnyRole(user, ["moderator"]);

  return (
    <div className="xl:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild id="mobile-menu-trigger">
          <Button variant="ghost" size="sm">
            <Menu className="w-5 h-5 text-white" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[300px] sm:w-[350px] overflow-y-scroll no-scrollbar shadow-md bg-card/95 backdrop-blur-sm"
        >
          <VisuallyHidden.Root>
            <SheetTitle>Menu</SheetTitle>
          </VisuallyHidden.Root>
          <SheetDescription className="sr-only">
            Navigate through the site
          </SheetDescription>
          <div className="flex flex-col gap-4 py-4">
            {/* User Info Header */}
            {user && (
              <div className="flex items-center ml-3 gap-3 pb-4 border-b">
                <UserAvatar user={user} className="w-12 h-12" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium not-only:truncate text-muted-foreground">
                    {user.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </div>
                  <Badge variant="secondary" className="mt-1">
                    {user.role.includes("admin")
                      ? "User"
                      : user.role.join(", ")}
                  </Badge>
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-1">
              {routes.map((route) => {
                return (
                  <NavButton
                    key={route.href}
                    href={`/${user.role}/${route.href}` as Route}
                    label={route.label}
                    icon={route.icon}
                    linkClassName="justify-start"
                    buttonClassName={cn(
                      // Show all on mobile by default
                      "flex",
                      // md: hide priority 1 (it's in desktop nav)
                      route.priority === 1 && "md:hidden",
                      // lg: hide priority 1-2 (they're in desktop nav)
                      route.priority <= 2 && "lg:hidden",
                      // xl: hide priority 1-3 (they're in desktop nav)
                      route.priority <= 3 && "xl:hidden",
                      // 2xl: hide all (everything is in desktop nav)
                      "2xl:hidden"
                    )}
                  />
                );
              })}
            </nav>

            {/* Create Actions Section */}
            {user && (
              <>
                <Separator />
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-foreground px-2 mb-2">
                    CREATE
                  </div>

                  <LinkButton
                    href={`/${user.role}/posts/create` as Route}
                    label="New Post"
                    variant="ghost"
                    buttonClassName="text-foreground"
                    icon={Plus}
                  />

                  <LinkButton
                    href={`/${user.role}/groups/create` as Route}
                    label="New Group"
                    variant="ghost"
                    buttonClassName="text-foreground"
                    icon={Plus}
                  />

                  {canCreateClass && (
                    <LinkButton
                      href={`/${user.role}/classes/create` as Route}
                      label="New Class"
                      variant="ghost"
                      buttonClassName="text-foreground"
                      icon={Plus}
                    />
                  )}

                  {isModerator && (
                    <LinkButton
                      href={`/${user.role}/announcements/create` as Route}
                      label="Site Announcement"
                      variant="ghost"
                      buttonClassName="text-foreground"
                      icon={Plus}
                    />
                  )}
                </div>
              </>
            )}

            <Separator />

            {/* Sign Out / Sign In */}
            <div className="mx-2">
              {user ? (
                <MobileSignOutButton buttonClassName="text-foreground hover:text-foreground hover:bg-secondary" />
              ) : (
                <LinkButton href="/" label="Sign In" buttonClassName="text-foreground" />
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
