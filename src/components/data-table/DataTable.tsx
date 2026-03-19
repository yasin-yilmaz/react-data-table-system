import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Props<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  total: number;
};

const DataTable = <TData,>({ columns, data, total = 0 }: Props<TData>) => {
  const table = useReactTable({
    data,
    columns,
    rowCount: total,
    getCoreRowModel: getCoreRowModel(),
  });

  return <div>DataTable</div>;
};

export default DataTable;
