import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const recordPurchase = mutation({
  args: {
    stripeSessionId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("purchases")
      .withIndex("by_stripeSessionId", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId)
      )
      .first();

    if (existing) return existing._id;

    return await ctx.db.insert("purchases", {
      stripeSessionId: args.stripeSessionId,
      email: args.email.toLowerCase().trim(),
      createdAt: Date.now(),
    });
  },
});

export const checkByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const purchase = await ctx.db
      .query("purchases")
      .withIndex("by_email", (q) =>
        q.eq("email", args.email.toLowerCase().trim())
      )
      .first();
    return purchase !== null;
  },
});
