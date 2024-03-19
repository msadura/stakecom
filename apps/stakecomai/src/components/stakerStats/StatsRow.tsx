import { Box } from "~/components/ui/box";

interface Props {
  label: string;
  value: string;
}

export const StatsRow = ({ label, value }: Props) => {
  return (
    <Box justify="between" align="center">
      <p className="text-sm font-medium leading-none">{label}</p>
      <p className="text-sm text-muted-foreground">{value}</p>
    </Box>
  );
};
