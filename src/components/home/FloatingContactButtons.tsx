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
            opacity: .6;
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

        @keyframes floatButton {
          0%,100%{
            transform:translateY(0);
          }
          50%{
            transform:translateY(-6px);
          }
        }

        .pulse-ring{
          position:absolute;
          inset:0;
          border-radius:9999px;
          animation:pulseRing 1.8s infinite;
        }

        .floating-btn{
          animation:floatButton 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* LEFT CALL BUTTON */}
      <a
        href={`tel:${phoneNumber}`}
        aria-label="Call Now"
        className="fixed left-5 bottom-6 z-[9999]"
      >
        <div className="relative floating-btn">
          <span className="pulse-ring bg-blue-600"></span>

          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,.45)] transition hover:scale-110">
            <Phone size={30} strokeWidth={2.5} />
          </div>
        </div>
      </a>

      {/* RIGHT WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed right-5 bottom-6 z-[9999]"
      >
        <div className="relative floating-btn">
          <span className="pulse-ring bg-[#25D366]"></span>

          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,.45)] transition hover:scale-110">
            <FaWhatsapp size={34} />
          </div>
        </div>
      </a>
    </>
  );
}