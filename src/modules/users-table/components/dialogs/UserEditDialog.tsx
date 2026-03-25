"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { TUser } from "@/modules/users-table/types/User.type";

type Props = {
  user: TUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type TFormState = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  gender: string;
};

const UserEditDialog = ({ user, open, onOpenChange }: Props) => {
  const initialValues = useMemo<TFormState>(
    () => ({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      role: user.role ?? "",
      gender: user.gender ?? "",
    }),
    [user.firstName, user.lastName, user.email, user.role, user.gender],
  );

  const [form, setForm] = useState<TFormState>(initialValues);

  const changeField = (key: keyof TFormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialValues);
  };

  const cancelHandler = () => {
    resetForm();
    onOpenChange(false);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Edited user (simulation):", {
      id: user.id,
      ...form,
    });

    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setForm(initialValues);
        } else {
          resetForm();
        }

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="sm:max-w-140">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information locally. Changes are not saved to the
            backend.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`firstName-${user.id}`}>First Name</Label>
              <Input
                id={`firstName-${user.id}`}
                value={form.firstName}
                onChange={(event) =>
                  changeField("firstName", event.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`lastName-${user.id}`}>Last Name</Label>
              <Input
                id={`lastName-${user.id}`}
                value={form.lastName}
                onChange={(event) =>
                  changeField("lastName", event.target.value)
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`email-${user.id}`}>Email</Label>
            <Input
              id={`email-${user.id}`}
              type="email"
              value={form.email}
              onChange={(event) => changeField("email", event.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`role-${user.id}`}>Role</Label>
              <Input
                id={`role-${user.id}`}
                value={form.role}
                onChange={(event) => changeField("role", event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`gender-${user.id}`}>Gender</Label>
              <Input
                id={`gender-${user.id}`}
                value={form.gender}
                onChange={(event) => changeField("gender", event.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={cancelHandler}>
              Cancel
            </Button>

            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;
