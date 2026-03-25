"use client";

import {
  CalendarDays,
  Globe,
  Mail,
  Shield,
  User,
  VenetianMask,
} from "lucide-react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { printDate } from "@/helpers/date.helper";
import type { TUser } from "@/modules/users-table/types/User.type";

type Props = {
  user: TUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => {
  return (
    <div className="flex items-start gap-3 rounded-lg border p-3">
      <div className="text-muted-foreground mt-0.5">{icon}</div>

      <div className="min-w-0">
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
};

const UserDetailsDialog = ({ user, open, onOpenChange }: Props) => {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Detailed information for {fullName}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex items-center gap-4 rounded-xl border p-4">
            <Image
              src={user.image || "/placeholder-avatar.png"}
              alt={fullName}
              className="size-16 rounded-full border object-cover"
              width={64}
              height={64}
            />

            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold">{fullName}</h3>
              <p className="text-muted-foreground truncate text-sm">
                {user.email}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoRow
              icon={<User className="size-4" />}
              label="Full Name"
              value={fullName}
            />

            <InfoRow
              icon={<Mail className="size-4" />}
              label="Email"
              value={user.email}
            />

            <InfoRow
              icon={<Shield className="size-4" />}
              label="Role"
              value={user.role}
            />

            <InfoRow
              icon={<VenetianMask className="size-4" />}
              label="Gender"
              value={user.gender}
            />

            <InfoRow
              icon={<CalendarDays className="size-4" />}
              label="Birth Date"
              value={printDate(user.birthDate)}
            />

            <InfoRow
              icon={<Globe className="size-4" />}
              label="Country"
              value={user.address?.country ?? "-"}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
