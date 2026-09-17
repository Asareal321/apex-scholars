"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatUsd, type LessonPackage } from "@/lib/catalog";

export function MockCheckoutForm({ lessonPackage }: { lessonPackage: LessonPackage }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const response = await fetch("/api/checkout/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: lessonPackage.id, name, email }),
      });
      const data = (await response.json()) as { error?: string; redirect?: string };
      if (!response.ok || !data.redirect) {
        throw new Error(data.error || "Could not record this request.");
      }
      router.push(data.redirect);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not record this request.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Alert>
        <AlertTitle>Pay by Interac e-Transfer before the session</AlertTitle>
        <AlertDescription>
          This local preview records the request. It does not move money. On the live offer you
          send Interac e-Transfer before the Zoom session. 24-hour cancellation policy.
        </AlertDescription>
      </Alert>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Request not recorded</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="name">Your name</Label>
        <Input
          id="name"
          className="h-10"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="receipt-email">Your email</Label>
        <Input
          id="receipt-email"
          type="email"
          className="h-10"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <Button type="submit" disabled={pending} className="h-11 w-full px-4">
        {pending ? "Recording…" : `Confirm ${formatUsd(lessonPackage.priceCents)} request`}
      </Button>
    </form>
  );
}
