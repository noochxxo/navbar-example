import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Route } from "next";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  href: Route;
  label: string;
  buttonClassName?: string;
  linkClassName?: string;
  iconClassName?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: LucideIcon;
}

export const LinkButton = ({
  href,
  label,
  buttonClassName,
  linkClassName,
  iconClassName,
  variant,
  icon: Icon,
}: LinkButtonProps) => {
  return (
    <Button
      asChild
      variant={variant? variant : 'default'}
      className={cn('w-full justify-start', buttonClassName)}
    >
      <Link href={href}
        className={linkClassName}
      >
        {Icon && <Icon className={`w-4 h-4 mr-2 ${iconClassName}`} />}
        {label}
      </Link>
    </Button>
  );
};
