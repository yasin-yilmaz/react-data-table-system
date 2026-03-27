"use client";

import {
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { useDebounce } from "use-debounce";

import { getTableErrorMessage } from "@/lib/utils";

import DataTable from "@/components/data-table/DataTable";
import { useErrorToast } from "@/hooks/useErrorToast";

import {
  mapColumnFiltersToPayload,
  mapQueryToColumnFilters,
  mapSortingToBackendSorting,
  mapSortQueryToSorting,
} from "@/helpers/table.helper";
import {
  USER_FILTER_DEFS,
  USER_FILTER_QUERY_PARSERS,
} from "@/modules/users-table/constants/userFilters";
import useUsers from "@/modules/users-table/hooks/useUsers";
import { createTableHandlers } from "@/modules/users-table/table/usersTableHandlers";

import { userColumns } from "../table/userColumns";

const UsersTable = () => {
  const [{ q, page, pageSize, sort, ...filterValues }, setQuery] =
    useQueryStates({
      q: parseAsString.withDefault(""),
      page: parseAsIndex.withDefault(0),
      pageSize: parseAsInteger.withDefault(10),
      sort: parseAsString.withDefault(""),
      ...USER_FILTER_QUERY_PARSERS,
    });

  const columnFilters = mapQueryToColumnFilters(
    USER_FILTER_DEFS,
    filterValues as Record<string, string | null>,
  );

  const sorting = mapSortQueryToSorting(sort);

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

  const [debouncedSearch] = useDebounce(q, 500);
  const backendSorting = mapSortingToBackendSorting(sorting, userColumns);
  const backendFilters = mapColumnFiltersToPayload(columnFilters);

  const { data, isLoading, isError, error, refetch } = useUsers({
    pageIndex: page,
    pageSize,
    sorting: backendSorting,
    search: debouncedSearch,
    filters: backendFilters,
  });

  useErrorToast(error);

  const tableErrorMessage = getTableErrorMessage(error);

  return (
    <DataTable
      data={data?.users || []}
      total={data?.total || 0}
      columns={userColumns}
      error={isError ? tableErrorMessage : null}
      onRetry={refetch}
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
      filters={USER_FILTER_DEFS}
    />
  );
};

export default UsersTable;
