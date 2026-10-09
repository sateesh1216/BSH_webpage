// =============================================================================
// API CLIENT  (website -> backend)
// -----------------------------------------------------------------------------
// Base URL comes from  VITE_API_URL  in the frontend .env file:
//   dev        VITE_API_URL=http://localhost:5000
//   production VITE_API_URL=https://api.yourdomain.com
// (no trailing "/api" - it is added below)
// =============================================================================

type ViteEnv = { VITE_API_URL?: string; VITE_COMPANY_KEY?: string; DEV?: boolean };
const env = ((import.meta as unknown as { env?: ViteEnv }).env ?? {}) as ViteEnv;

export const API_BASE = (env.VITE_API_URL || (env.DEV ? "http://localhost:5000" : ""))
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

// Which company this website belongs to. BSH site => "BSH", NRK site => "NRK".
// Set VITE_COMPANY_KEY in the frontend .env (defaults to BSH for this project).
export const COMPANY_KEY = (env.VITE_COMPANY_KEY || "BSH").trim().toUpperCase();

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status = 0, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

interface ApiEnvelope<T> {
  success?: boolean;
  message?: string;
  code?: string;
  data?: T;
}

async function request<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 30_000);

  try {
    const res = await fetch(`${API_BASE}/api${path}`, {
      method: init.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        // lets the request through when the API is exposed with an ngrok URL
        "ngrok-skip-browser-warning": "true",
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      signal: controller.signal,
    });

    let json: ApiEnvelope<T> = {};
    try {
      json = (await res.json()) as ApiEnvelope<T>;
    } catch {
      /* non-JSON response */
    }

    if (!res.ok || json.success === false) {
      throw new ApiError(
        json.message || "Something went wrong. Please try again.",
        res.status,
        json.code
      );
    }
    return json.data as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError("The server took too long to respond. Please try again.");
    }
    throw new ApiError("Unable to reach the server. Please check your internet and try again.");
  } finally {
    window.clearTimeout(timer);
  }
}

/* -------------------------------------------------------------------------- */
/* Booking payload (shared by Enquiry + Pay Now)                              */
/* -------------------------------------------------------------------------- */

export interface BookingPayload {
  /** "Local Taxi" | "Outstation Cab" | "Airport Taxi" | "Tour Package" */
  service_type: string;
  tour_package_type?: string;
  pickup_location?: string;
  drop_location?: string;
  travel_date?: string; // YYYY-MM-DD
  travel_time?: string; // HH:MM
  passengers?: number;
  vehicle?: string;
  notes?: string;

  customer_name: string;
  mobile: string;
  customer_email?: string;
}

export interface PayNowPayload extends BookingPayload {
  /** Fare lookup keys - the server decides the amount from these. */
  planA: string; // local package id  /  tour package id
  planB?: string;
  vehicle_key: string; // car id
}

export interface EnquiryResult {
  enquiry: { id: string; enquiry_number: string; status: string };
}

export interface PayNowResult {
  enquiry: { id: string; enquiry_number: string };
  quote?: { amount: number; currency: string; label?: string };
  payment: { id: string; merchant_txn_id: string; amount: number; gateway: string };
  checkoutUrl: string;
  redirectUrl: string;
}

export interface PaymentStatusResult {
  status: string;
  amount: number | string;
  paid_amount?: number | string | null;
  payment_mode?: string | null;
  transaction_id?: string | null;
  paid_at?: string | null;
  invoice?: { invoice_number: string; pdf_url: string } | null;
}

/** "Send Enquiry" -> POST /api/enquiries */
export function submitEnquiry(payload: BookingPayload) {
  return request<EnquiryResult>("/enquiries", {
    method: "POST",
    body: { ...payload, company_key: COMPANY_KEY },
  });
}

/** "Pay Now" -> POST /api/payments/booking-now  (returns the gateway URL) */
export function startPayNow(payload: PayNowPayload) {
  return request<PayNowResult>("/payments/booking-now", {
    method: "POST",
    body: { ...payload, company_key: COMPANY_KEY },
  });
}

/** Payment result page -> GET /api/payments/status/:ref */
export function getPaymentStatus(ref: string) {
  return request<PaymentStatusResult>(`/payments/status/${encodeURIComponent(ref)}`);
}