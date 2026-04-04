import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    // Demo mode: simulate successful checkout
    return NextResponse.json({ url: "/success?demo=true" });
  }

  try {
    const stripe = new Stripe(stripeKey);
    const body = await request.json();
    const { returnPath } = body;

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "GetDreamRole — Resume Optimization",
              description:
                "One-time payment for unlimited resume analysis and AI-powered rewrites across all ATS platforms.",
              images: [],
            },
            unit_amount: 999,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&return=${encodeURIComponent(returnPath || "/optimize")}`,
      cancel_url: `${origin}${returnPath || "/optimize"}`,
      metadata: {
        product: "ats-forge-access",
      },
    });

    // Ensure gdrUserId cookie is set before Stripe redirect
    // (fallback in case proxy.ts hasn't run yet)
    const response = NextResponse.json({ url: session.url });
    if (!request.cookies.get("gdrUserId")) {
      response.cookies.set("gdrUserId", crypto.randomUUID(), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
