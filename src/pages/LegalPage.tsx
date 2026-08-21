import SEO from "../components/seo/SEO";
import { Link, useLocation } from "react-router-dom";

const content = {
  "/privacy-policy": {
    title: "Privacy Policy",
    description: "Read the privacy policy for BSH Taxi Services and learn how booking and contact information is handled.",
    heading: "Privacy Policy",
    body: "BSH Taxi Services uses the information you provide through booking and contact forms only to respond to enquiries, arrange transportation, provide customer support, and improve our services. We do not sell personal information. Please contact us if you have questions about your information.",
  },
  "/terms": {
    title: "Terms & Conditions",
    description: "Read the terms and conditions for using BSH Taxi Services taxi, airport transfer and outstation services.",
    heading: "Terms & Conditions",
    body: "Bookings are subject to vehicle availability, agreed fares, route conditions, tolls, permits, waiting time and the specific terms communicated at booking. Customers should confirm pickup details, travel dates and passenger requirements before the trip.",
  },
} as const;

export default function LegalPage() {
  const { pathname } = useLocation();
  const meta = content[pathname as keyof typeof content] ?? content["/privacy-policy"];

  return (
    <>
      <SEO title={meta.title} description={meta.description} canonicalPath={pathname} />
      <main className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        <nav className="mb-6 text-sm text-slate-500">
          <Link to="/" className="hover:text-primary">Home</Link> / {meta.heading}
        </nav>
        <h1 className="text-4xl font-extrabold text-slate-900">{meta.heading}</h1>
        <p className="mt-6 max-w-3xl leading-8 text-slate-600">{meta.body}</p>
      </main>
    </>
  );
}
