"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { TUser } from "@/modules/users-table/types/User.type";

type TProps = {
  user: TUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const UserDeleteDialog = ({ user, open, onOpenChange }: TProps) => {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  const confirmHandler = () => {
    console.log("Delete user (simulation):", user);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            This action is simulated only. The user will not be deleted from the
            backend.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 rounded-lg border p-4 text-sm">
          <p>
            Are you sure you want to delete{" "}
            <span className="font-medium">{fullName || "this user"}</span>?
          </p>

          <p className="text-muted-foreground">
            This cannot be persisted and will only simulate the action.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button type="button" variant="destructive" onClick={confirmHandler}>
            Delete User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDeleteDialog;
