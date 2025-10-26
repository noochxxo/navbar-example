import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface TooltipToggleButtonProps {
  icon: LucideIcon;
  label: string;
  size?: "icon" | "default" | "sm" | "lg" | "icon-sm" | "icon-lg" | null | undefined;
  isActive: boolean;
  onToggle: () => void;
  buttonClassName?: string;
  iconClassName?: string;
  toolTipClassName?: string;
}

export const TooltipToggleButton =({
  icon: Icon,
  label,
  size,
  isActive,
  onToggle,
  buttonClassName,
  iconClassName,
  toolTipClassName,
}: TooltipToggleButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isActive ? "default" : "ghost"}
          size={size ? size : 'sm'}
          onClick={onToggle}
          aria-label={`Toggle ${label.toLowerCase()} mode`}
          aria-pressed={isActive}
          className={buttonClassName}
        >
          <Icon className={`w-4 h-4 ${iconClassName}`} />
        </Button>
      </TooltipTrigger>
      <TooltipContent className={toolTipClassName}>
        {isActive ? "Disable" : "Enable"} {label.toLowerCase()}
      </TooltipContent>
    </Tooltip>
  );
}