import { useState } from "react";

import {
  Column,
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

import { cn } from "@/lib/utils";

import TableMessageRow from "@/components/data-table/TableMessageRow";
import TablePagination from "@/components/data-table/TablePagination";
import TableToolbar from "@/components/data-table/TableToolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  total: number;
  isLoading?: boolean;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  columnFilters: ColumnFiltersState;
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
  minSearchLength?: number;
  leftPinnedColumnIds?: string[];
  rightPinnedColumnIds?: string[];
};

const DataTable = <TData,>({
  columns,
  data,
  total = 0,
  isLoading = false,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  globalFilter,
  onGlobalFilterChange,
  columnFilters,
  onColumnFiltersChange,
  minSearchLength,
  leftPinnedColumnIds = [],
  rightPinnedColumnIds = [],
}: Props<TData>) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

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

    onSortingChange: (updater) => {
      const nextSorting =
        typeof updater === "function" ? updater(sorting) : updater;

      onSortingChange(nextSorting);
      onPaginationChange({
        ...pagination,
        pageIndex: 0,
      });
    },
    onPaginationChange,

    onColumnFiltersChange,
    enableSortingRemoval: true,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
  });

  const rows = table.getRowModel().rows;
  const colSpan = table.getAllLeafColumns().length;

  const getColumnStyle = (column: Column<TData>) => {
    const pinned = column.getIsPinned();

    return {
      position: pinned ? ("sticky" as const) : undefined,
      left: pinned === "left" ? `${column.getStart("left")}px` : undefined,
      right: pinned === "right" ? `${column.getAfter("right")}px` : undefined,
      zIndex: pinned ? 2 : undefined,
      width: column.getSize(),
      minWidth: column.columnDef.minSize,
      maxWidth: column.columnDef.maxSize,
    };
  };

  return (
    <>
      <TableToolbar
        table={table}
        searchValue={globalFilter}
        onSearchChange={onGlobalFilterChange}
        minSearchLength={minSearchLength}
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
            <TableBody>
              {isLoading ? (
                <TableMessageRow colSpan={colSpan} message="Loading..." />
              ) : rows.length ? (
                rows.map((row) => (
                  <TableRow key={row.id} className="group hover:bg-muted">
                    {row.getVisibleCells().map((cell) => {
                      const style = getColumnStyle(cell.column);
                      return (
                        <TableCell
                          key={cell.id}
                          className="bg-background group-hover:bg-muted whitespace-nowrap"
                          style={style}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableMessageRow colSpan={colSpan} message="No Data!" />
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <TablePagination table={table} />
    </>
  );
};

export default DataTable;
