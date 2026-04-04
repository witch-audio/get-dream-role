"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Zap, Loader2 } from "lucide-react";
import clsx from "clsx";

interface PaymentGateProps {
  onSuccess: () => void;
  returnPath?: string;
}

const features = [
  "Unlimited resume analyses",
  "All 6 ATS platform targets",
  "AI rewrites powered by Groq",
  "Section-by-section feedback",
  "Full optimized resume export",
];

export default function PaymentGate({
  onSuccess,
  returnPath,
}: PaymentGateProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRestore, setShowRestore] = useState(false);
  const [restoreEmail, setRestoreEmail] = useState("");
  const [isRestoring, setIsRestoring] = useState(false);

  const handleUnlock = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnPath: returnPath || "/optimize" }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to start checkout");
      }

      window.location.href = data.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setIsLoading(false);
    }
  };

  const handleRestore = async () => {
    if (!restoreEmail.trim()) return;
    setIsRestoring(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/payment-status?email=${encodeURIComponent(restoreEmail.trim())}`
      );
      const data = await res.json();

      if (data.paid) {
        try {
          localStorage.setItem("gdrPaid", "true");
        } catch { /* ignore */ }
        onSuccess();
      } else {
        setError("No purchase found for that email. Double-check the address you used at checkout.");
        setIsRestoring(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setIsRestoring(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("gdrPaid", "demo");
    onSuccess();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-xl border border-forge-accent/40 bg-forge-surface p-6"
    >
      {!showRestore ? (
        <>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-4 w-4 text-forge-accent" />
            <span className="font-display text-base font-semibold text-forge-text">
              Unlock Unlimited Analyses
            </span>
          </div>

          <p className="text-sm text-forge-muted mb-5">
            You&apos;ve used your free analysis. Unlock unlimited for a one-time payment.
          </p>

          <div className="mb-5">
            <span className="font-display text-4xl font-bold text-forge-text">$9.99</span>
            <span className="ml-2 text-sm text-forge-muted">/one-time</span>
          </div>

          <div className="border-t border-forge-border mb-5" />

          <ul className="space-y-2.5 mb-6">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5">
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-forge-success" />
                <span className="text-sm text-forge-text">{feature}</span>
              </li>
            ))}
          </ul>

          {error && (
            <div className="mb-4 rounded-lg border border-forge-danger/30 bg-forge-danger/5 px-3 py-2.5 text-xs text-forge-danger">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleUnlock}
            disabled={isLoading}
            className={clsx(
              "w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors",
              isLoading
                ? "bg-forge-border text-forge-muted cursor-not-allowed"
                : "bg-forge-accent text-forge-bg hover:bg-forge-accent-hover",
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting to Stripe…
              </>
            ) : (
              "Unlock for $9.99 →"
            )}
          </button>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-forge-muted">
              Secure payment via Stripe. No subscription.
            </p>
            <button
              type="button"
              onClick={handleDismiss}
              className="text-xs text-forge-muted underline underline-offset-2 hover:text-forge-text transition-colors"
            >
              Maybe Later
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => { setShowRestore(true); setError(null); }}
              className="text-xs text-forge-muted hover:text-forge-text transition-colors underline underline-offset-2"
            >
              Already paid? Restore access
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-4 w-4 text-forge-accent" />
            <span className="font-display text-base font-semibold text-forge-text">
              Restore Your Access
            </span>
          </div>

          <p className="text-sm text-forge-muted mb-5">
            Enter the email address you used when you paid and we&apos;ll restore your access instantly.
          </p>

          {error && (
            <div className="mb-4 rounded-lg border border-forge-danger/30 bg-forge-danger/5 px-3 py-2.5 text-xs text-forge-danger">
              {error}
            </div>
          )}

          <input
            type="email"
            value={restoreEmail}
            onChange={(e) => setRestoreEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRestore()}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-forge-border bg-forge-bg px-3 py-2.5 text-sm text-forge-text placeholder:text-forge-muted focus:border-forge-accent focus:outline-none mb-3"
          />

          <button
            type="button"
            onClick={handleRestore}
            disabled={isRestoring || !restoreEmail.trim()}
            className={clsx(
              "w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors",
              isRestoring || !restoreEmail.trim()
                ? "bg-forge-border text-forge-muted cursor-not-allowed"
                : "bg-forge-accent text-forge-bg hover:bg-forge-accent-hover",
            )}
          >
            {isRestoring ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking…
              </>
            ) : (
              "Restore Access →"
            )}
          </button>

          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => { setShowRestore(false); setError(null); }}
              className="text-xs text-forge-muted underline underline-offset-2 hover:text-forge-text transition-colors"
            >
              ← Back
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
