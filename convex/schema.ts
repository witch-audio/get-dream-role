import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  purchases: defineTable({
    stripeSessionId: v.string(),
    email: v.string(),
    createdAt: v.number(),
  })
    .index("by_stripeSessionId", ["stripeSessionId"])
    .index("by_email", ["email"]),
});
