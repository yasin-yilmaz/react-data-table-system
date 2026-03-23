import { setSingleFilter } from "@/lib/utils";
import { GENDER_OPTIONS, ROLE_OPTIONS } from "@/constants/userFIlters";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";

type Props<TData> = {
  table: Table<TData>;
};

const UserFilters = <TData,>({ table }: Props<TData>) => {
  const filters = table.getState().columnFilters;

  const roleValue =
    (filters.find((filter) => filter.id === "role")?.value as string) ?? "";

  const genderValue =
    (filters.find((filter) => filter.id === "gender")?.value as string) ?? "";

  const changeFilter = (id: string, value: string | null) => {
    const nextFilters = setSingleFilter(id, value === "all" ? "" : value);

    table.setColumnFilters(nextFilters);
    table.setPageIndex(0);
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={roleValue || "all"}
        onValueChange={(value) =>
          changeFilter("role", value === "all" ? "" : value)
        }
      >
        <SelectTrigger className="w-37.5">
          <SelectValue placeholder="Role" />
        </SelectTrigger>

        <SelectContent>
          {ROLE_OPTIONS.map((option) => (
            <SelectItem
              key={option.value || "all-roles"}
              value={option.value || "all"}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={genderValue || "all"}
        onValueChange={(value) =>
          changeFilter("gender", value === "all" ? "" : value)
        }
      >
        <SelectTrigger className="w-37.5">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>

        <SelectContent>
          {GENDER_OPTIONS.map((option) => (
            <SelectItem
              key={option.value || "all-genders"}
              value={option.value || "all"}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserFilters;
