import { getPackage } from "@/lib/catalog";
import { savePayment, type StoredPayment } from "@/lib/data";
import { getStripeSecretKey } from "@/lib/env";
import Stripe from "stripe";

export async function confirmStripeSession(
  sessionId: string,
  packageId?: string
): Promise<StoredPayment> {
  const secret = getStripeSecretKey();
  if (!secret) {
    throw new Error("Stripe is not configured on this server.");
  }

  const stripe = new Stripe(secret);
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const resolvedPackageId =
    (typeof session.metadata?.packageId === "string" && session.metadata.packageId) || packageId;
  const lessonPackage = getPackage(resolvedPackageId);
  if (!lessonPackage) {
    throw new Error("Unknown package on this session.");
  }

  const paid = session.payment_status === "paid" || session.status === "complete";
  return savePayment({
    confirmation: `STRIPE-${session.id}`,
    packageId: lessonPackage.id,
    packageName: lessonPackage.name,
    amountCents: lessonPackage.priceCents,
    email: session.customer_details?.email || session.customer_email || "stripe-customer",
    name: session.customer_details?.name || "Stripe customer",
    mode: "stripe",
    status: paid ? "paid" : "checkout_created",
    stripeSessionId: session.id,
  });
}
