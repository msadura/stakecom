import { Box } from "~/components/ui/box";
import { cn } from "~/lib/utils";

interface Props {
  label: string;
  value: string;
  highlighted?: boolean;
  valueClassName?: string;
  labelClassName?: string;
}

export const StatsRow = ({
  label,
  value,
  highlighted,
  valueClassName,
  labelClassName,
}: Props) => {
  return (
    <Box justify="between" align="center">
      <p className={cn("text-sm font-medium leading-none", labelClassName)}>
        {label}
      </p>
      <p
        className={cn(
          "text-sm text-muted-foreground",
          {
            "font-bold": highlighted,
          },
          valueClassName,
        )}
      >
        {value}
      </p>
    </Box>
  );
};
