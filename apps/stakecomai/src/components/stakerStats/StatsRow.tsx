import { Box } from "~/components/ui/box";
import { InfoTooltip } from "~/components/ui/infoTooltip";
import { cn } from "~/lib/utils";

interface Props {
  label: string;
  valueTooltip?: string;
  value: string;
  highlighted?: boolean;
  valueClassName?: string;
  labelClassName?: string;
}

export const StatsRow = ({
  label,
  valueTooltip,
  value,
  highlighted,
  valueClassName,
  labelClassName,
}: Props) => {
  return (
    <Box justify="between" align="center" className="flex-1">
      <Box direction="row" align="center" className="gap-1">
        <p className={cn("text-sm font-medium leading-none", labelClassName)}>
          {label}
        </p>
      </Box>

      <Box direction="row" align="center" className="gap-1">
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

        {!!valueTooltip && <InfoTooltip tooltip={valueTooltip} />}
      </Box>
    </Box>
  );
};
