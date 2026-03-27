import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";

type TFilterDef = {
  id: string;
  queryKey: string;
};

type TFilterValues = Record<string, string | null>;

type TSortableColumnDef<TData> = ColumnDef<TData> & {
  meta?: {
    sortKey?: string;
  };
};

export const mapQueryToColumnFilters = (
  filterDefs: TFilterDef[],
  filterValues: TFilterValues,
): ColumnFiltersState => {
  return filterDefs.flatMap((filter) => {
    const value = filterValues[filter.queryKey];
    return value ? [{ id: filter.id, value }] : [];
  });
};

export const mapSortQueryToSorting = (sort: string): SortingState => {
  if (!sort) return [];

  const [id = "", direction] = sort.split(".");

  return [
    {
      id,
      desc: direction === "desc",
    },
  ];
};

export const getSortKey = <TData>(
  columnId: string,
  columns: TSortableColumnDef<TData>[],
) => {
  const column = columns.find((col) => col.id === columnId);
  return column?.meta?.sortKey ?? columnId;
};

export const mapSortingToBackendSorting = <TData>(
  sorting: SortingState,
  columns: TSortableColumnDef<TData>[],
): SortingState => {
  return sorting.map((item) => ({
    ...item,
    id: getSortKey(item.id, columns),
  }));
};

export const mapColumnFiltersToPayload = (
  columnFilters: ColumnFiltersState,
) => {
  return columnFilters.map((filter) => ({
    id: filter.id,
    value: String(filter.value),
  }));
};
