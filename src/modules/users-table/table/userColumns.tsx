"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";

import ColumnHeader from "@/components/data-table/TableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";

import { printDate } from "@/helpers/date.helper";
import UserActionCell from "@/modules/users-table/components/UserActionCell";
import type { TUser } from "@/modules/users-table/types/User.type";

export const userColumns: ColumnDef<TUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && false)
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 30,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <ColumnHeader column={column} title="ID" />,
    size: 30,
    enableHiding: false,
  },

  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
    size: 120,
    minSize: 80,
    maxSize: 300,
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return <span className="line-clamp-1">{`${firstName} ${lastName}`}</span>;
    },
    enableHiding: false,
    meta: {
      sortKey: "firstName",
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => <ColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      const { email } = row.original;

      return (
        <Link
          href={`mailto:${email}`}
          className="line-clamp-1 text-blue-400 hover:underline hover:opacity-80"
        >
          {email}
        </Link>
      );
    },
  },

  {
    accessorKey: "role",
    header: ({ column }) => <ColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      const { role } = row.original;
      return <span className="capitalize">{role}</span>;
    },
  },

  {
    accessorKey: "gender",
    header: ({ column }) => <ColumnHeader column={column} title="Gender" />,
    cell: ({ row }) => {
      const { gender } = row.original;
      return <span className="capitalize">{gender}</span>;
    },
  },

  {
    accessorKey: "age",
    header: ({ column }) => <ColumnHeader column={column} title="Age" />,
    size: 30,
  },

  {
    id: "country",
    accessorFn: (row) => row.address.country,
    header: ({ column }) => <ColumnHeader column={column} title="Country" />,
    size: 80,
    maxSize: 120,
    cell: ({ row }) => {
      return <span>{row.original.address.country}</span>;
    },
  },

  {
    accessorKey: "birthDate",
    header: ({ column }) => <ColumnHeader column={column} title="Birth Date" />,
    sortingFn: "datetime",
    cell: ({ row }) => {
      return (
        <span className="font-mono tabular-nums">
          {printDate(row.original.birthDate)}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UserActionCell user={row.original} />,
    enableHiding: false,
    enableSorting: false,
    size: 64,
  },
];
