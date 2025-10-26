import { signOut } from "@/lib/actions/auth.actions";
import Form from "next/form";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SignOutButtonProps {
  formClassName?: string;
  menuItemClassName?: string;
  buttonClassName?: string;
  iconClassName?: string;
}

export const SignOutButton = ({ formClassName, menuItemClassName, buttonClassName, iconClassName }: SignOutButtonProps) => {
  return (
    <Form action={signOut} className={formClassName}>
      <DropdownMenuItem asChild className={menuItemClassName}>
        <Button
          type="submit"
          variant="default"
          className={cn('w-full flex justify-start', buttonClassName)}
        >
          <LogOut className={cn('w-4 h-4 mr-2',iconClassName)} />
          Sign Out
        </Button>
      </DropdownMenuItem>
    </Form>
  );
};

export const MobileSignOutButton = ({ formClassName, buttonClassName, iconClassName }: SignOutButtonProps) => {
  return (
    <Form action={signOut} className={formClassName}>
      <Button
        variant="outline"
        className={cn('justify-start w-full', buttonClassName)}
      >
        <LogOut className={cn('w-4 h-4 mr-2', iconClassName)} /> Sign Out
      </Button>
    </Form>
  );
};
