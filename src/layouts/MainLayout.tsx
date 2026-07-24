import type { ReactNode } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen text-slate-700">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}