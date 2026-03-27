import { flexRender, type Table } from "@tanstack/react-table";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

import getColumnStyle from "./helpers/getColumnPinningStyle";

type Props<TData> = {
  table: Table<TData>;
};

const DataTableHeader = <TData,>({ table }: Props<TData>) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow className="bg-white" key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const style = getColumnStyle(header.column);

            return (
              <TableHead
                key={header.id}
                className="bg-background whitespace-nowrap"
                style={style}
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
      ))}
    </TableHeader>
  );
};

export default DataTableHeader;
