import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/validations/users";
import { hasAnyRole } from "@/lib/utils";
import { DropdownMenuLink } from "../../buttons/dropdown-menu-link";
import { Route } from "next";

interface CreateMenuProps {
  user: User;
}

export function CreateMenu({ user }: CreateMenuProps) {
  if (!user) return null;

  const canCreateClass = hasAnyRole(user, ["user", "moderator"]);
  const isModerator = hasAnyRole(user, ["moderator"]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-1" /> Create
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {/* Everyone can create posts */}

        <DropdownMenuLink
          href={`/${user.role}/posts/create` as Route}
          label="New Post"
        />

        <DropdownMenuLink
          href={`/${user.role}/groups/create` as Route}
          label="New Group"
        />

        {/* Only Educators and Moderators can create classes */}
        {canCreateClass && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuLink
              href={`/${user.role}/classes/create` as Route}
              label="New Class"
            />
          </>
        )}

        {/* Moderator-specific actions */}
        {isModerator && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLink
              href={`/${user.role}/announcements/create` as Route}
              label="Site Announcement"
            />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
