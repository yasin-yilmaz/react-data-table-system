import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  className?: string;
  innerClassName?: string;
}>;

const TableWrapper = ({ children, className, innerClassName }: Props) => {
  return (
    <div className={cn("overflow-hidden rounded-sm border", className)}>
      <div className={cn("overflow-x-auto", innerClassName)}>{children}</div>
    </div>
  );
};

export default TableWrapper;
