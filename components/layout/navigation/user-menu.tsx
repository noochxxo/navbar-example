import { ChevronDown, User as UserIcon, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "./user-avatar";
import { User } from "@/lib/validations/users";
import { DropdownMenuLink } from "../../buttons/dropdown-menu-link";
import { SignOutButton } from "../../buttons/sign-out-button";
import { Route } from "next";

interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const roleLabel = user.role.includes("user") ? "User" : user.role.join(", ")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild id="user-menu-trigger">
        <Button variant="ghost" className="hidden relative md:flex items-center gap-2">
          <UserAvatar user={user} className="w-8 h-8" />
          <span className="hidden sm:block max-w-[120px] truncate text-foreground">
            {user.name}
          </span>
          <ChevronDown className="w-4 h-4 opacity-50 " />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs truncate">
              {user.email}
            </p>
            <Badge variant="secondary" className="w-fit text-2xs mt-1">
              {roleLabel}
            </Badge>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuLink
          href={`/${user.role}/profile` as Route}
          label="My Profile"
          icon={UserIcon}
        />

        <DropdownMenuLink
          href={`/${user.role}/settings` as Route}
          label="Settings"
          // className="text-muted-foreground focus:bg-accent/60 focus:text-destructive-foreground"
          icon={Settings}
        />

        <DropdownMenuSeparator />

        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
