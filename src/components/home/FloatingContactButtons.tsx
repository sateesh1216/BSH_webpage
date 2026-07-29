import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingContactButtons() {
  const phoneNumber = "+918886803322";
  const whatsappNumber = "918886803322";

  return (
    <>
      <style>{`
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: .55;
          }
          80% {
            transform: scale(1.6);
            opacity: 0;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        @keyframes floating {
          0%,100%{
            transform:translateY(0);
          }
          50%{
            transform:translateY(-5px);
          }
        }

        .pulse-ring{
          position:absolute;
          inset:0;
          border-radius:9999px;
          animation:pulseRing 1.8s infinite;
        }

        .floating{
          animation:floating 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* Mobile Call/WhatsApp now live in the bottom tab bar (MobileBottomNav),
          so no separate floating buttons are rendered on mobile here —
          avoids stacking two sets of the same buttons on small screens. */}

      {/* ================= DESKTOP ================= */}

      {/* Left Call */}
      <a
        href={`tel:${phoneNumber}`}
        className="fixed left-6 bottom-6 z-[9999] hidden md:block"
        aria-label="Call Now"
      >
        <div className="relative floating">
          <span className="pulse-ring bg-blue-600"></span>

          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_12px_35px_rgba(37,99,235,.45)] transition duration-300 hover:scale-110">
            <Phone size={30} strokeWidth={2.5} />
          </div>
        </div>
      </a>

      {/* Right WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-[9999] hidden md:block"
        aria-label="WhatsApp"
      >
        <div className="relative floating">
          <span className="pulse-ring bg-[#25D366]"></span>

          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,.45)] transition duration-300 hover:scale-110">
            <FaWhatsapp size={34} />
          </div>
        </div>
      </a>
    </>
  );
}