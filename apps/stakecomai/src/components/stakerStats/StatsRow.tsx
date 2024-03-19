import { Box } from "~/components/ui/box";
import { cn } from "~/lib/utils";

interface Props {
  label: string;
  value: string;
  highlighted?: boolean;
}

export const StatsRow = ({ label, value, highlighted }: Props) => {
  return (
    <Box justify="between" align="center">
      <p className="text-sm font-medium leading-none">{label}</p>
      <p
        className={cn("text-sm text-muted-foreground", {
          "font-bold": highlighted,
        })}
      >
        {value}
      </p>
    </Box>
  );
};
