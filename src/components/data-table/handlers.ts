import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Updater,
} from "@tanstack/react-table";

import { USER_FILTER_DEFS } from "@/constants/userFilters";

type TSetQuery = (params: Record<string, unknown>) => void;

type TParams = {
  page: number;
  pageSize: number;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  setQuery: TSetQuery;
  sortFieldMap?: Record<string, string>;
};

const resolveUpdater = <T>(updater: Updater<T>, current: T): T => {
  if (typeof updater === "function") {
    return (updater as (old: T) => T)(current);
  }

  return updater;
};

export const createTableHandlers = ({
  page,
  pageSize,
  sorting,
  columnFilters,
  setQuery,
}: TParams) => {
  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    const current: PaginationState = {
      pageIndex: page,
      pageSize,
    };

    const next = resolveUpdater(updater, current);

    setQuery({
      page: next.pageSize !== pageSize ? 0 : next.pageIndex,
      pageSize: next.pageSize === 10 ? null : next.pageSize,
    });
  };

  const handleGlobalFilterChange = (value: string) => {
    setQuery({
      q: value || null,
      page: 0,
    });
  };

  const handleColumnFiltersChange = (updater: Updater<ColumnFiltersState>) => {
    const nextFilters = resolveUpdater(updater, columnFilters);
    const activeFilter = nextFilters[0];

    const nextQuery = USER_FILTER_DEFS.reduce<Record<string, string | null>>(
      (acc, filter) => {
        acc[filter.queryKey] =
          activeFilter?.id === filter.id ? String(activeFilter.value) : null;

        return acc;
      },
      {},
    );

    setQuery({
      ...nextQuery,
      page: 0,
    });
  };

  const handleSortingChange = (updater: Updater<SortingState>) => {
    const nextSorting = resolveUpdater(updater, sorting);
    const activeSort = nextSorting[0];

    const nextSort = activeSort
      ? `${activeSort.id}.${activeSort.desc ? "desc" : "asc"}`
      : null;

    setQuery({
      sort: nextSort,
      page: 0,
    });
  };

  return {
    handlePaginationChange,
    handleGlobalFilterChange,
    handleColumnFiltersChange,
    handleSortingChange,
  };
};
