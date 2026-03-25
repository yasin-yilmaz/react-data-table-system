"use client";

import { useState } from "react";

import { Copy, Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";

import UserCloneDialog from "@/components/modules/user-table/user-table-dialog/UserCloneDialog";
import UserDeleteDialog from "@/components/modules/user-table/user-table-dialog/UserDeleteDialog";
import UserDetailsDialog from "@/components/modules/user-table/user-table-dialog/UserDetailsDialog";
import UserEditDialog from "@/components/modules/user-table/user-table-dialog/UserEditDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { TUser } from "@/types/User.type";

type TProps = {
  user: TUser;
};

const UserActionCell = ({ user }: TProps) => {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [cloneOpen, setCloneOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-8 cursor-pointer"
                aria-label={`${fullName} actions`}
              >
                <MoreVertical className="size-4" />
              </Button>
            }
          />

          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              onClick={() => setDetailsOpen(true)}
              className="cursor-pointer gap-2"
            >
              <Eye className="size-4 text-sky-500" />
              <span>View</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setEditOpen(true)}
              className="cursor-pointer gap-2"
            >
              <Pencil className="size-4 text-amber-500" />
              <span>Edit</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setCloneOpen(true)}
              className="cursor-pointer gap-2"
            >
              <Copy className="size-4 text-violet-500" />
              <span>Clone</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setDeleteOpen(true)}
              className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
            >
              <Trash2 className="size-4 text-red-500" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <UserDetailsDialog
        user={user}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
      <UserEditDialog user={user} open={editOpen} onOpenChange={setEditOpen} />
      <UserCloneDialog
        user={user}
        open={cloneOpen}
        onOpenChange={setCloneOpen}
      />
      <UserDeleteDialog
        user={user}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
};

export default UserActionCell;
