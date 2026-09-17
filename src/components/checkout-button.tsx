"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function CheckoutButton({
  packageId,
  label = "Request this session",
  className,
}: {
  packageId: string;
  label?: string;
  className?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  function startCheckout() {
    setPending(true);
    router.push(`/checkout/mock?package=${packageId}`);
  }

  return (
    <Button
      type="button"
      onClick={startCheckout}
      disabled={pending}
      className={className ?? "h-10 w-full px-4"}
    >
      {pending ? "Opening…" : label}
    </Button>
  );
}
