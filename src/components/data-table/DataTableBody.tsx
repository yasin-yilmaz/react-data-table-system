import type { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

import TableMessageRow from "@/components/data-table/TableMessageRow";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import getColumnStyle from "./helpers/getColumnPinningStyle";

type Props<TData> = {
  table: Table<TData>;
  colSpan: number;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

const DataTableBody = <TData,>({
  table,
  colSpan,
  isLoading = false,
  error = null,
  onRetry,
}: Props<TData>) => {
  const rows = table.getRowModel().rows;

  const renderErrorRow = () => (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-24 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <span>{error}</span>

          {onRetry && (
            <Button variant="outline" onClick={onRetry}>
              Tekrar dene
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );

  let bodyContent: React.ReactNode;

  if (isLoading) {
    bodyContent = <TableMessageRow colSpan={colSpan} message="Loading..." />;
  } else if (error) {
    bodyContent = renderErrorRow();
  } else if (rows.length > 0) {
    bodyContent = rows.map((row) => (
      <TableRow key={row.id} className="group hover:bg-muted">
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            className="bg-background group-hover:bg-muted whitespace-nowrap"
            style={getColumnStyle(cell.column)}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  } else {
    bodyContent = <TableMessageRow colSpan={colSpan} message="No data." />;
  }

  return <TableBody>{bodyContent}</TableBody>;
};

export default DataTableBody;
