import { getPackage } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/env";

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
    return Response.json({ error: "Choose a listed rate before confirming." }, { status: 400 });
  }

  const origin = getSiteUrl(request);
  return Response.json({
    url: `${origin}/checkout/mock?package=${lessonPackage.id}`,
    mode: "mock",
  });
}
