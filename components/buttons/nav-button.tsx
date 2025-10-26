'use client'

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "next";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  href: Route;
  label: string;
  size?: "icon" | "default" | "sm" | "lg" | "icon-sm" | "icon-lg" | null | undefined;
  buttonClassName?: string;
  linkClassName?: string;
  iconClassName?: string;
  icon?: LucideIcon;
}

export const NavButton = ({
  href,
  label,
  size,
  buttonClassName,
  linkClassName,
  iconClassName,
  icon: Icon,
}: NavButtonProps ) => {
  const pathname = usePathname();
  return (
    
    <Button
      asChild
      variant={pathname.startsWith(href) ? "default" : "ghost"}
      size={size ? size : 'sm'}
      className={cn('text-foreground', buttonClassName)}
    >
      <Link href={href} className={linkClassName}>
        {Icon && <Icon className={`w-4 h-4 mr-2 ${iconClassName}`} />}
        {label}
      </Link>
    </Button>
  );
};
