import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "./";

const boxVariants = cva("", {
  variants: {
    align: {
      center: "items-center",
      start: "items-start",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    center: {
      true: "flex items-center justify-center",
      false: "",
    },
    direction: {
      row: "flex-row",
      rowReverse: "flex-row-reverse",
      col: "flex-col",
      colReverse: "flex-col-reverse",
    },
    display: {
      col: "flex flex-col",
      flex: "flex",
      grid: "grid",
      inline: "inline-flex",
      none: "hidden",
      row: "flex flex-row",
    },
    justify: {
      center: "justify-center",
      start: "justify-start",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      wrapReverse: "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    display: "flex",
  },
});

export interface BoxProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  asChild?: boolean;
}

function Box({
  align,
  children,
  center,
  className,
  direction,
  justify,
  wrap,
  ...props
}: BoxProps) {
  return (
    <div
      {...props}
      className={cn(
        boxVariants({ justify, center, direction, wrap, align, className }),
      )}
    >
      {children}
    </div>
  );
}

export { Box };
