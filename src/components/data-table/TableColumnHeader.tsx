"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

type Props<TData> = {
  column: Column<TData>;
  title: string;
};

const ColumnHeader = <TData,>({ column, title }: Props<TData>) => {
  const sorted = column.getIsSorted();

  const sortHandler = () => {
    if (!sorted) {
      column.toggleSorting(false);
      return;
    }

    if (sorted === "asc") {
      column.toggleSorting(true);
      return;
    }

    column.clearSorting();
  };

  return (
    <Button
      variant={"link"}
      size="sm"
      className="flex h-8 w-full cursor-pointer justify-start gap-2 px-0 font-medium"
      onClick={sortHandler}
    >
      <span>{title}</span>
      {sorted === "asc" ? (
        <ArrowDown size="4" />
      ) : sorted === "desc" ? (
        <ArrowUp size="4" />
      ) : (
        <ArrowUpDown size="4" />
      )}
    </Button>
  );
};

export default ColumnHeader;
