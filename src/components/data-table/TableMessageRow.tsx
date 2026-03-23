import { TableCell, TableRow } from "../ui/table";

type Props = {
  colSpan?: number;
  message: string;
};

const TableMessageRow = ({ colSpan = 1, message }: Props) => (
  <TableRow>
    <TableCell colSpan={colSpan} className="h-24 text-center">
      {message}
    </TableCell>
  </TableRow>
);

export default TableMessageRow;
