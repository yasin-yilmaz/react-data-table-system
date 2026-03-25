"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import type { Table } from "@tanstack/react-table";

import TableFilters from "@/components/data-table/TableFilters";
import TableSearch from "@/components/data-table/TableSearch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TFilterDef } from "@/types/Table.type";

type Props<TData> = {
  table: Table<TData>;
  searchValue: string;
  onSearchChange: (value: string) => void;
  minSearchLength?: number;
  onReset?: () => void;
  filters?: TFilterDef[];
};

const TableToolbar = <TData,>({
  table,
  searchValue,
  onSearchChange,
  minSearchLength,
  onReset,
  filters,
}: Props<TData>) => {
  const hasActiveState =
    !!searchValue ||
    table.getState().sorting.length > 0 ||
    table.getState().columnFilters.length > 0 ||
    table.getAllColumns().some((column) => !column.getIsVisible());

  const resetHandler = () => {
    if (onReset) {
      onReset();
      return;
    }

    table.resetGlobalFilter();
    table.resetColumnFilters();
    table.resetColumnVisibility();
    table.resetSorting();
    table.setPageIndex(0);
  };

  return (
    <div className="flex items-center justify-between gap-3 py-4">
      <div className="flex items-center gap-2">
        <TableSearch
          value={searchValue}
          onChange={onSearchChange}
          minSearchLength={minSearchLength}
        />

        <TableFilters table={table} filters={filters} />
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="size-4" />
                Columns
              </Button>
            }
          />

          <DropdownMenuContent align="end" className="w-48">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  className="capitalize"
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          onClick={resetHandler}
          disabled={!hasActiveState}
          className="gap-2"
        >
          <RotateCcw className="size-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default TableToolbar;
