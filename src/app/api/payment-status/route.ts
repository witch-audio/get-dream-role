import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email || !process.env.NEXT_PUBLIC_CONVEX_URL) {
    return NextResponse.json({ paid: false });
  }

  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    const paid = await convex.query(api.purchases.checkByEmail, { email });
    return NextResponse.json({ paid });
  } catch {
    return NextResponse.json({ paid: false });
  }
}
