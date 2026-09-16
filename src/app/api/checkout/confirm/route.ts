import { confirmStripeSession } from "@/lib/stripe-record";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { sessionId?: string; packageId?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a Stripe session id." }, { status: 400 });
  }

  if (!body.sessionId) {
    return Response.json({ error: "Missing session_id." }, { status: 400 });
  }

  try {
    const saved = await confirmStripeSession(body.sessionId, body.packageId);
    return Response.json({
      storage: saved.source,
      status: saved.status,
      confirmation: saved.confirmation,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not record the Stripe payment.";
    return Response.json({ error: message }, { status: 502 });
  }
}
