import { Loader2 } from "lucide-react";

import { cn } from "~/lib/utils";

interface Props {
  size?: number;
  className?: string;
}

export function Spinner({ size = 50, className }: Props) {
  return (
    <Loader2
      className={cn(className, "animate-spin")}
      width={size}
      height={size}
    />
  );
}
