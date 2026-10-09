import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, XCircle, Clock, AlertCircle, Loader2, Download, Home, MessageCircle } from "lucide-react";
import { getPaymentStatus, type PaymentStatusResult } from "../lib/api";

// The backend redirects here after the gateway (Cashfree / SabPaisa) finishes:
//   /payment/result?status=success&ref=<merchant_txn_id>
// (path is set by FRONTEND_PAYMENT_RESULT_PATH in the backend .env)

const WHATSAPP_NUMBER = "918886803322";
const POLL_EVERY_MS = 3000;
const MAX_POLLS = 10;

type Outcome = "success" | "pending" | "failed" | "cancelled" | "expired" | "error";

function toOutcome(raw: string | null | undefined): Outcome {
  const s = String(raw ?? "").trim().toLowerCase();
  if (["success", "paid", "captured"].includes(s)) return "success";
  if (["failed", "failure", "declined"].includes(s)) return "failed";
  if (["cancelled", "canceled", "user_dropped", "terminated"].includes(s)) return "cancelled";
  if (s === "expired") return "expired";
  if (s === "error") return "error";
  return "pending";
}

function money(value: number | string | null | undefined) {
  const n = Number(value);
  return Number.isFinite(n) ? `₹${Math.round(n).toLocaleString("en-IN")}` : "—";
}

const COPY: Record<Outcome, { title: string; text: string }> = {
  success: {
    title: "Payment Successful",
    text: "Thank you! Your booking is confirmed. Our team will contact you shortly with the driver and vehicle details.",
  },
  pending: {
    title: "Confirming your payment...",
    text: "Please wait a moment while we confirm your payment with the bank. Do not close this page.",
  },
  failed: {
    title: "Payment Failed",
    text: "Your payment could not be completed and no money has been booked. If an amount was deducted, it will be refunded automatically by your bank.",
  },
  cancelled: {
    title: "Payment Cancelled",
    text: "You cancelled the payment. You can go back and try again whenever you are ready.",
  },
  expired: {
    title: "Payment Link Expired",
    text: "This payment session has expired. Please start a new booking.",
  },
  error: {
    title: "Something Went Wrong",
    text: "We could not verify your payment. If money was deducted, please contact us with your reference and we will sort it out.",
  },
};

export default function PaymentResultPage() {
  const [params] = useSearchParams();
  const ref = params.get("ref") ?? "";
  const [outcome, setOutcome] = useState<Outcome>(toOutcome(params.get("status")));
  const [info, setInfo] = useState<PaymentStatusResult | null>(null);
  const polls = useRef(0);

  // Ask the server for the real status (the URL alone is not proof of payment).
  useEffect(() => {
    if (!ref) {
      if (outcome === "pending") setOutcome("error");
      return;
    }

    let cancelled = false;
    let timer: number | undefined;

    async function check() {
      try {
        const data = await getPaymentStatus(ref);
        if (cancelled) return;
        setInfo(data);
        const next = toOutcome(data.status);
        setOutcome(next);
        if (next === "pending" && polls.current < MAX_POLLS) {
          polls.current += 1;
          timer = window.setTimeout(check, POLL_EVERY_MS);
        }
      } catch {
        if (cancelled) return;
        if (polls.current < 3) {
          polls.current += 1;
          timer = window.setTimeout(check, POLL_EVERY_MS);
        } else {
          setOutcome((o) => (o === "success" ? o : "error"));
        }
      }
    }

    check();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  const copy = COPY[outcome];
  const Icon =
    outcome === "success" ? CheckCircle2 : outcome === "pending" ? Clock : outcome === "error" ? AlertCircle : XCircle;
  const tone =
    outcome === "success"
      ? "text-emerald-500"
      : outcome === "pending"
        ? "text-amber-500"
        : outcome === "error"
          ? "text-orange-500"
          : "text-red-500";

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
      <Helmet>
        <title>Payment Status | BSH Taxi Services</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl sm:p-8">
        {outcome === "pending" ? (
          <Loader2 size={56} className="mx-auto animate-spin text-amber-500" />
        ) : (
          <Icon size={56} className={`mx-auto ${tone}`} />
        )}

        <h1 className="mt-4 text-xl font-bold text-slate-800">{copy.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{copy.text}</p>

        {outcome === "success" && info && (
          <div className="mt-5 space-y-2 rounded-xl bg-slate-50 p-4 text-left text-sm">
            <Row label="Amount paid" value={money(info.paid_amount ?? info.amount)} />
            {info.payment_mode && <Row label="Payment mode" value={String(info.payment_mode)} />}
            {info.transaction_id && <Row label="Transaction ID" value={String(info.transaction_id)} />}
            <Row label="Reference" value={ref} />
          </div>
        )}

        {outcome === "success" && info?.invoice?.pdf_url && (
          <a
            href={info.invoice.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-blue-300 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50"
          >
            <Download size={15} /> Download Invoice {info.invoice.invoice_number}
          </a>
        )}

        {outcome !== "success" && ref && outcome !== "pending" && (
          <p className="mt-4 text-xs text-slate-400">Reference: {ref}</p>
        )}

        <div className="mt-6 grid gap-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-500 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30"
          >
            <Home size={15} /> {outcome === "success" ? "Back to Home" : "Try Booking Again"}
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hi BSH Taxi Services, I need help with my payment${ref ? ` (ref: ${ref})` : ""}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
          >
            <MessageCircle size={15} /> Need help? WhatsApp us
          </a>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="shrink-0 text-slate-500">{label}</span>
      <span className="break-all text-right font-medium text-slate-800">{value}</span>
    </div>
  );
}