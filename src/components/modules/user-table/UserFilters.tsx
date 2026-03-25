import { Table } from "@tanstack/react-table";

import { setSingleFilter } from "@/lib/utils";
import { USER_FILTER_DEFS } from "@/constants/userFilters";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props<TData> = {
  table: Table<TData>;
};

const UserFilters = <TData,>({ table }: Props<TData>) => {
  const filters = table.getState().columnFilters;

  const getFilterValue = (id: string) => {
    return (filters.find((filter) => filter.id === id)?.value as string) ?? "";
  };

  const changeFilter = (id: string, value: string | null) => {
    const nextFilters = setSingleFilter(id, value);

    table.setColumnFilters(nextFilters);
    table.setPageIndex(0);
  };

  return (
    <div className="flex items-center gap-2">
      {USER_FILTER_DEFS.map((filter) => {
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

export default UserFilters;
