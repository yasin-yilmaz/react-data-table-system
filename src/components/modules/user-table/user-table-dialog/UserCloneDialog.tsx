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

import type { TUser } from "@/types/User.type";

type Props = {
  user: TUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const UserCloneDialog = ({ user, open, onOpenChange }: Props) => {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  const confirmHandler = () => {
    console.log("Clone user (simulation):", user);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle>Clone User</DialogTitle>
          <DialogDescription>
            This action is simulated only. No new user will be created on the
            backend.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 rounded-lg border p-4 text-sm">
          <p>
            You are about to clone{" "}
            <span className="font-medium">{fullName || "this user"}</span>.
          </p>

          <p className="text-muted-foreground">Email: {user.email}</p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button type="button" onClick={confirmHandler}>
            Clone User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserCloneDialog;
