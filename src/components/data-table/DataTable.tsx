import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import DataTableBody from "@/components/data-table/DataTableBody";
import TablePagination from "@/components/data-table/TablePagination";
import TableToolbar from "@/components/data-table/TableToolbar";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import getColumnStyle from "./helpers/getColumnPinningStyle";

import { TFilterDef } from "@/types/Table.type";

type Props<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  total: number;

  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;

  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;

  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;

  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;

  columnFilters: ColumnFiltersState;
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;

  leftPinnedColumnIds?: string[];
  rightPinnedColumnIds?: string[];
  filters?: TFilterDef[];
};

const DataTable = <TData,>({
  columns,
  data,
  total,

  isLoading = false,
  error = null,
  onRetry,

  pagination,
  onPaginationChange,

  sorting,
  onSortingChange,

  globalFilter,
  onGlobalFilterChange,

  columnFilters,
  onColumnFiltersChange,

  leftPinnedColumnIds = [],
  rightPinnedColumnIds = [],
  filters = [],
}: Props<TData>) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    rowCount: total,
    state: {
      columnVisibility,
      globalFilter,
      sorting,
      pagination,
      columnFilters,
    },
    initialState: {
      columnPinning: {
        left: leftPinnedColumnIds,
        right: rightPinnedColumnIds,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange,
    onSortingChange,
    onPaginationChange,
    onColumnFiltersChange,
    enableSortingRemoval: true,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
  });

  const colSpan = table.getAllLeafColumns().length;

  return (
    <>
      <TableToolbar
        table={table}
        searchValue={globalFilter}
        onSearchChange={onGlobalFilterChange}
        filters={filters}
        onReset={() => {
          onGlobalFilterChange("");
          onColumnFiltersChange([]);
          onSortingChange([]);
          onPaginationChange({
            pageIndex: 0,
            pageSize: pagination.pageSize,
          });
          table.resetColumnVisibility();
        }}
      />
      <div className="overflow-hidden rounded-sm border">
        <div className="overflow-x-auto">
          <Table className="min-w-max">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <TableRow className="bg-white" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const style = getColumnStyle(header.column);
                      return (
                        <TableHead
                          key={header.id}
                          className="bg-background whitespace-nowrap"
                          style={{ ...style }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableHeader>
            <DataTableBody
              table={table}
              colSpan={colSpan}
              isLoading={isLoading}
              error={error}
              onRetry={onRetry}
            />
          </Table>
        </div>
      </div>
      <TablePagination table={table} />
    </>
  );
};

export default DataTable;
