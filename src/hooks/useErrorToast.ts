"use client";

import { useEffect, useRef } from "react";

import { toast } from "sonner";

export const useErrorToast = (error: unknown) => {
  const lastErrorMessageRef = useRef<string | null>(null);

  useEffect(() => {
    if (!(error instanceof Error)) {
      lastErrorMessageRef.current = null;
      return;
    }

    if (lastErrorMessageRef.current === error.message) {
      return;
    }

    toast.error(error.message);
    lastErrorMessageRef.current = error.message;
  }, [error]);
};
