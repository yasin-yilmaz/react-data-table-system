"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";

import type { TUser } from "@/types/User.type";

export const userColumns: ColumnDef<TUser>[] = [
  {
    accessorKey: "id",
    size: 30,
    enableHiding: false,
  },

  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    size: 120,
    minSize: 80,
    maxSize: 300,
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return <span className="line-clamp-1">{`${firstName} ${lastName}`}</span>;
    },
    enableHiding: false,
  },

  {
    accessorKey: "email",

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

    cell: ({ row }) => {
      const { role } = row.original;
      return <span className="capitalize">{role}</span>;
    },
  },

  {
    accessorKey: "gender",

    cell: ({ row }) => {
      const { gender } = row.original;
      return <span className="capitalize">{gender}</span>;
    },
  },

  {
    accessorKey: "age",
  },

  {
    id: "country",
    accessorFn: (row) => row.address.country,

    size: 80,
    maxSize: 120,
    cell: ({ row }) => {
      return <span>{row.original.address.country}</span>;
    },
  },

  {
    accessorKey: "birthDate",

    sortingFn: "datetime",
  },

  {
    id: "actions",
    header: "",
    enableHiding: false,
    enableSorting: false,
    size: 64,
  },
];
