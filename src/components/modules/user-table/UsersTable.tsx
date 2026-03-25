"use client";

import {
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { useDebounce } from "use-debounce";
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";

import {
  USER_FILTER_DEFS,
  USER_FILTER_QUERY_PARSERS,
} from "@/constants/userFilters";

import DataTable from "@/components/data-table/DataTable";
import { createTableHandlers } from "@/components/data-table/handlers";
import useUsers from "@/hooks/useUsers";

import { userColumns } from "./userColumns";

const UsersTable = () => {
  const [{ q, page, pageSize, sort, ...filterValues }, setQuery] =
    useQueryStates({
      q: parseAsString.withDefault(""),
      page: parseAsIndex.withDefault(0),
      pageSize: parseAsInteger.withDefault(10),
      sort: parseAsString.withDefault(""),
      ...USER_FILTER_QUERY_PARSERS,
    });

  const columnFilters: ColumnFiltersState = USER_FILTER_DEFS.flatMap(
    (filter) => {
      const value = filterValues[filter.queryKey];

      return value ? [{ id: filter.id, value }] : [];
    },
  );

  const sorting: SortingState = (() => {
    if (!sort) return [];

    const [id = "", direction] = sort.split(".");

    return [
      {
        id,
        desc: direction === "desc",
      },
    ];
  })();

  const getSortKey = (columnId: string) => {
    const column = userColumns.find((col) => col.id === columnId);
    return column?.meta?.sortKey ?? columnId;
  };

  const backendSorting: SortingState = sorting.map((item) => ({
    ...item,
    id: getSortKey(item.id),
  }));

  const [debouncedSearch] = useDebounce(q, 500);

  const {
    handlePaginationChange,
    handleGlobalFilterChange,
    handleColumnFiltersChange,
    handleSortingChange,
  } = createTableHandlers({
    page,
    pageSize,
    sorting,
    columnFilters,
    setQuery,
  });

  const { data, isLoading, isError, error } = useUsers({
    pageIndex: page,
    pageSize,
    sorting: backendSorting,
    search: debouncedSearch,
    filters: columnFilters.map((filter) => ({
      id: filter.id,
      value: String(filter.value),
    })),
  });

  if (isError)
    return (
      <div className="rounded-sm border p-4 text-sm text-red-500">
        {error instanceof Error ? error.message : "Something went wrong."}
      </div>
    );

  return (
    <DataTable
      data={data?.users || []}
      total={data?.total || 0}
      columns={userColumns}
      isLoading={isLoading}
      leftPinnedColumnIds={["select", "id", "name"]}
      rightPinnedColumnIds={["actions"]}
      sorting={sorting}
      pagination={{
        pageIndex: page,
        pageSize,
      }}
      onPaginationChange={handlePaginationChange}
      globalFilter={q}
      onGlobalFilterChange={handleGlobalFilterChange}
      columnFilters={columnFilters}
      onColumnFiltersChange={handleColumnFiltersChange}
      onSortingChange={handleSortingChange}
    />
  );
};

export default UsersTable;
