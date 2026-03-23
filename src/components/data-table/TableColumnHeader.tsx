"use client";

import { Column } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

type Props<TData> = {
  column: Column<TData>;
  title: string;
};

const ColumnHeader = <TData,>({ column, title }: Props<TData>) => {
  const sorted = column.getIsSorted();

  const sortHandler = () => {
    if (!sorted) {
      column.toggleSorting(false);
      return null;
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
      className="h-8 w-full cursor-pointer flex justify-start gap-2 font-medium px-0"
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
