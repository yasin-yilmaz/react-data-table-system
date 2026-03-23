"use client";

import useUsers from "@/hooks/useUsers";
import DataTable from "../../components/data-table/DataTable";
import { userColumns } from "./userColumns";
import {
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useDebounce } from "use-debounce";

const UsersTable = () => {
  const [{ q, gender, page, pageSize, role, sort }, setQuery] = useQueryStates({
    q: parseAsString.withDefault(""),
    page: parseAsIndex.withDefault(0),
    pageSize: parseAsInteger.withDefault(10),
    sort: parseAsString.withDefault(""),
    role: parseAsString.withDefault(""),
    gender: parseAsString.withDefault(""),
  });

  const columnFilters: ColumnFiltersState = [
    ...(role ? [{ id: "role", value: role }] : []),
    ...(gender ? [{ id: "gender", value: gender }] : []),
  ];

  const [debouncedSearch] = useDebounce(q, 500);

  const sorting: SortingState = sort
    ? [
        {
          id: sort.split(".")[0] ?? "",
          desc: sort.split(".")[1] === "desc",
        },
      ]
    : [];

  const { data, isLoading, isError, error } = useUsers({
    pageIndex: page,
    pageSize,
    sorting,
    search: debouncedSearch,
    filters: columnFilters.map((filter) => ({
      id: filter.id,
      value: String(filter.value),
    })),
  });

  if (isError)
    <div className="rounded-sm border p-4 text-sm text-red-500">
      {error instanceof Error ? error.message : "Something went wrong."}
    </div>;

  return (
    <div>
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
        onPaginationChange={(updater) => {
          const current = {
            pageIndex: page,
            pageSize,
          };

          const next =
            typeof updater === "function" ? updater(current) : updater;

          setQuery({
            page: next.pageSize !== pageSize ? 0 : next.pageIndex,
            pageSize: next.pageSize === 10 ? null : next.pageSize,
          });
        }}
        globalFilter={q}
        onGlobalFilterChange={(value) => {
          setQuery({
            q: value || null,
            page: 0,
          });
        }}
        columnFilters={columnFilters}
        onColumnFiltersChange={(updater) => {
          const nextFilters =
            typeof updater === "function" ? updater(columnFilters) : updater;

          const nextRole =
            String(
              nextFilters.find((filter) => filter.id === "role")?.value ?? "",
            ) || null;

          const nextGender =
            String(
              nextFilters.find((filter) => filter.id === "gender")?.value ?? "",
            ) || null;

          setQuery({
            role: nextRole,
            gender: nextGender,
            page: 0,
          });
        }}
        onSortingChange={(updater) => {
          const nextSorting =
            typeof updater === "function" ? updater(sorting) : updater;

          const nextSort = nextSorting[0]
            ? `${nextSorting[0].id}.${nextSorting[0].desc ? "desc" : "asc"}`
            : null;

          setQuery({
            sort: nextSort,
            page: 0,
          });
        }}
      />
    </div>
  );
};

export default UsersTable;
