import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ToggleButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onToggle: () => void;
  highContrast?: boolean;
  buttonClassName?: string;
  iconClassName?: string;
}

export const ToggleButton = ({
  icon: Icon,
  label,
  isActive,
  onToggle,
  highContrast = false,
  buttonClassName,
  iconClassName,
}: ToggleButtonProps) => {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      className={cn(
        `justify-start ${buttonClassName}`,
        highContrast ? "" : "",
        !isActive && highContrast && "",
        isActive && !highContrast && "",
      )}
      onClick={onToggle}
    >
      <Icon className={`w-4 h-4 mr-2 ${iconClassName}`} />
      {label}
    </Button>
  );
}