import { NextResponse } from "next/server";
import { getPackage } from "@/lib/catalog";
import { savePayment } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { packageId?: string; name?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send payment details as JSON." }, { status: 400 });
  }

  const lessonPackage = getPackage(body.packageId);
  if (!lessonPackage) {
    return NextResponse.json({ error: "That package is no longer listed." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  if (name.length < 2) {
    return NextResponse.json({ error: "Add the cardholder or parent name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Use a real email for the receipt." }, { status: 400 });
  }

  const confirmation = `MOCK-${lessonPackage.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  try {
    const saved = await savePayment({
      confirmation,
      packageId: lessonPackage.id,
      packageName: lessonPackage.name,
      amountCents: lessonPackage.priceCents,
      email,
      name,
      mode: "mock",
      status: "paid",
    });

    return NextResponse.json({
      confirmation,
      packageId: lessonPackage.id,
      storage: saved.source,
      redirect: `/checkout/success?package=${lessonPackage.id}&mode=mock&confirmation=${confirmation}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not record the mock payment.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
