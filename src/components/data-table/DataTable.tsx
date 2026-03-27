import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
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
import { Table } from "@/components/ui/table";

import DataTableHeader from "./DataTableHeader";
import TableWrapper from "./TableWrapper";

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
      <TableWrapper>
        <Table className="min-w-max">
          <DataTableHeader table={table} />
          <DataTableBody
            table={table}
            colSpan={colSpan}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />
        </Table>
      </TableWrapper>
      <TablePagination table={table} />
    </>
  );
};

export default DataTable;
