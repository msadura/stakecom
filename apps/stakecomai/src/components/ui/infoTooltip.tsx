import { HelpCircle } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface Props {
  size?: number;
  tooltip: string;
  label?: string;
  labelPosition?: "left" | "right";
}

export const InfoTooltip = ({
  size = 16,
  tooltip,
  label,
  labelPosition = "left",
}: Props) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          {!!label && labelPosition === "left" && (
            <p className="mr-2">{label}</p>
          )}
          <HelpCircle
            width={size}
            height={size}
            className="cursor-pointer text-muted-foreground transition-all hover:text-primary-foreground"
          />
          {!!label && labelPosition === "right" && <p>{label}</p>}
        </TooltipTrigger>
        <TooltipContent>
          <p className="ml-2">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
