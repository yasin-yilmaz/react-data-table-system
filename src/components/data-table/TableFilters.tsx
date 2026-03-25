import { Table } from "@tanstack/react-table";

import { setSingleFilter } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TFilterDef } from "@/types/Table.type";

type Props<TData> = {
  table: Table<TData>;
  filters?: TFilterDef[];
};

const TableFilters = <TData,>({ table, filters = [] }: Props<TData>) => {
  if (!filters.length) return null;

  const columnFilters = table.getState().columnFilters;

  const getFilterValue = (id: string) => {
    return (
      (columnFilters.find((filter) => filter.id === id)?.value as string) ?? ""
    );
  };

  const changeFilter = (id: string, value: string | null) => {
    const nextFilters = setSingleFilter(id, value);

    table.setColumnFilters(nextFilters);
    table.setPageIndex(0);
  };

  return (
    <div className="flex items-center gap-2">
      {filters.map((filter) => {
        const currentValue = getFilterValue(filter.id);

        return (
          <Select
            key={filter.id}
            value={currentValue || "all"}
            onValueChange={(value) =>
              changeFilter(filter.id, value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-37.5">
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>

            <SelectContent>
              {filter.options.map((option) => (
                <SelectItem
                  key={option.value || `all-${filter.id}`}
                  value={option.value || "all"}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      })}
    </div>
  );
};

export default TableFilters;
