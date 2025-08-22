import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ActionTooltipProps {
  align?: "start" | "center" | "end";
  children: React.ReactNode;
  className?: string;
  label: string;
  side?: "left" | "right" | "top" | "bottom";
  duration?: number;
}
const ActionTooltip = ({
  children,
  side,
  align,
  label,
  className,
  duration = 50,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={duration}>
        <TooltipTrigger className={className} asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} className={className}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip;
