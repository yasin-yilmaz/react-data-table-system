"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserSearch from "../../modules/user-table/UserSearch";
import UserFilters from "../../modules/user-table/UserFilters";

type Props<TData> = {
  table: Table<TData>;
  searchValue: string;
  onSearchChange: (value: string) => void;
  minSearchLength?: number;
  onReset?: () => void;
};

const DataGridToolbar = <TData,>({
  table,
  searchValue,
  onSearchChange,
  minSearchLength,
  onReset,
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
        <UserSearch
          value={searchValue}
          onChange={onSearchChange}
          minSearchLength={minSearchLength}
        />

        <UserFilters table={table} />
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

export default DataGridToolbar;
