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
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const digits = card.replace(/\s/g, "");
    if (digits.length < 13) {
      setError("Enter a card number to simulate payment. Nothing is charged.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("Expiry should look like 09/28.");
      return;
    }
    if (cvc.length < 3) {
      setError("Add a CVC. It never leaves this browser except as a local mock.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/checkout/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: lessonPackage.id, name, email }),
      });
      const data = (await response.json()) as { error?: string; redirect?: string };
      if (!response.ok || !data.redirect) {
        throw new Error(data.error || "Mock payment failed.");
      }
      router.push(data.redirect);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Mock payment failed.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Alert>
        <AlertTitle>Local payment sandbox</AlertTitle>
        <AlertDescription>
          Stripe keys are not set, so this page stands in for Checkout. No charge is sent
          anywhere. Add <code className="font-mono text-xs">STRIPE_SECRET_KEY</code> to use live
          Stripe Checkout instead.
        </AlertDescription>
      </Alert>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Payment not submitted</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="name">Name on card</Label>
        <Input
          id="name"
          className="h-10"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Alex North"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="receipt-email">Receipt email</Label>
        <Input
          id="receipt-email"
          type="email"
          className="h-10"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="alex@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="card">Card number</Label>
        <Input
          id="card"
          inputMode="numeric"
          autoComplete="off"
          className="h-10"
          value={card}
          onChange={(event) => setCard(event.target.value)}
          placeholder="4242 4242 4242 4242"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry</Label>
          <Input
            id="expiry"
            className="h-10"
            value={expiry}
            onChange={(event) => setExpiry(event.target.value)}
            placeholder="09/28"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            className="h-10"
            value={cvc}
            onChange={(event) => setCvc(event.target.value)}
            placeholder="123"
          />
        </div>
      </div>

      <Button type="submit" disabled={pending} className="h-11 w-full px-4">
        {pending ? "Confirming…" : `Pay ${formatUsd(lessonPackage.priceCents)} (mock)`}
      </Button>
    </form>
  );
}
