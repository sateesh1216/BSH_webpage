import type { ReactNode } from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";

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