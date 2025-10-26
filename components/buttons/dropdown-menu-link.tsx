import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Route } from "next";
import { LucideIcon } from "lucide-react";

interface DropdownMenuLinkProps {
  href: Route;
  label: string;
  linkClassName?: string;
  menuItemClassName?: string;
  iconClassName?: string;
  icon?: LucideIcon;
}

export const DropdownMenuLink = ({
  href,
  label,
  linkClassName,
  menuItemClassName,
  iconClassName,
  icon: Icon,
}: DropdownMenuLinkProps) => {
  return (
    <DropdownMenuItem asChild className={menuItemClassName}>
      <Link href={href} className={linkClassName}>
        {Icon && <Icon className={`w-4 h-4 mr-2 ${iconClassName}`} />}
        {label}
      </Link>
    </DropdownMenuItem>
  );
};
