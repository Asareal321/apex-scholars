import { getPackage } from "@/lib/catalog";
import { savePayment } from "@/lib/data";
import { getSiteUrl, getStripeSecretKey } from "@/lib/env";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { packageId?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON body with a packageId." }, { status: 400 });
  }

  const lessonPackage = getPackage(body.packageId);
  if (!lessonPackage) {
    return Response.json({ error: "Choose a listed package before checking out." }, { status: 400 });
  }

  const origin = getSiteUrl(request.url);
  const secret = getStripeSecretKey();

  if (!secret) {
    return Response.json({
      url: `${origin}/checkout/mock?package=${lessonPackage.id}`,
      mode: "mock",
    });
  }

  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: lessonPackage.priceCents,
            product_data: {
              name: `${lessonPackage.name} — Northline Tutors`,
              description: lessonPackage.headline,
            },
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&package=${lessonPackage.id}&mode=stripe`,
      cancel_url: `${origin}/checkout/cancel?package=${lessonPackage.id}`,
      metadata: {
        packageId: lessonPackage.id,
        studio: "northline-tutors",
      },
    });

    if (!session.url) {
      return Response.json({ error: "Stripe did not return a checkout URL." }, { status: 502 });
    }

    await savePayment({
      confirmation: `STRIPE-${session.id}`,
      packageId: lessonPackage.id,
      packageName: lessonPackage.name,
      amountCents: lessonPackage.priceCents,
      email: "checkout@pending",
      name: "Stripe Checkout",
      mode: "stripe",
      status: "checkout_created",
      stripeSessionId: session.id,
    });

    return Response.json({ url: session.url, mode: "stripe" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe checkout failed.";
    return Response.json({ error: message }, { status: 502 });
  }
}
