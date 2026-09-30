import React, { useEffect, useState } from "react";

const ArakuPopup: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .araku-popup-overlay {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(0, 0, 0, 0.78);
          backdrop-filter: blur(6px);
          animation: arakuFade 0.3s ease;
        }

        .araku-poster {
          position: relative;
          width: min(650px, 95vw);
          max-height: 95vh;
          overflow: hidden;
          border-radius: 18px;
          background: #f7f7f7;
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.6),
            0 0 0 2px rgba(255, 255, 255, 0.2);
          animation: arakuPopup 0.35s ease;
        }

        .araku-close {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 100;
          width: 42px;
          height: 42px;
          border: 2px solid white;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
          color: white;
          font-size: 28px;
          line-height: 35px;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .araku-close:hover {
          background: #f5c400;
          color: #063d1c;
          transform: rotate(90deg);
        }

        /* =========================================
           TOP POSTER
        ========================================= */

        .araku-scene {
          position: relative;
          height: 650px;
          overflow: hidden;
          background:
            linear-gradient(
              180deg,
              #9ed8f3 0%,
              #cceaf7 27%,
              #7fbf72 27%,
              #287239 65%,
              #0b481f 100%
            );
        }

        /* Clouds */

        .cloud {
          position: absolute;
          width: 110px;
          height: 35px;
          border-radius: 50px;
          background: rgba(255,255,255,0.8);
          filter: blur(1px);
        }

        .cloud::before,
        .cloud::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          background: white;
        }

        .cloud::before {
          width: 50px;
          height: 50px;
          left: 20px;
          bottom: 8px;
        }

        .cloud::after {
          width: 65px;
          height: 65px;
          right: 15px;
          bottom: 4px;
        }

        .cloud-1 {
          top: 70px;
          left: 42%;
        }

        .cloud-2 {
          top: 125px;
          right: 5%;
          transform: scale(0.8);
        }

        .cloud-3 {
          top: 175px;
          left: 52%;
          transform: scale(0.65);
        }

        /* Mountains */

        .mountain {
          position: absolute;
          bottom: 235px;
          width: 0;
          height: 0;
          border-left: 190px solid transparent;
          border-right: 190px solid transparent;
          border-bottom: 280px solid #276d38;
          opacity: 0.95;
        }

        .mountain-1 {
          left: 18%;
        }

        .mountain-2 {
          left: 47%;
          transform: scale(1.25);
          border-bottom-color: #1f6335;
        }

        .mountain-3 {
          right: -5%;
          transform: scale(0.9);
          border-bottom-color: #397b3b;
        }

        /* Mountain snow/fog */

        .fog {
          position: absolute;
          bottom: 360px;
          left: 30%;
          width: 60%;
          height: 45px;
          border-radius: 50%;
          background: rgba(255,255,255,0.55);
          filter: blur(10px);
          transform: rotate(-5deg);
        }

        /* Trees */

        .trees {
          position: absolute;
          bottom: 210px;
          width: 100%;
          height: 160px;
          background:
            radial-gradient(
              circle at 5% 80%,
              #06451f 0 45px,
              transparent 46px
            ),
            radial-gradient(
              circle at 15% 60%,
              #075723 0 60px,
              transparent 61px
            ),
            radial-gradient(
              circle at 27% 80%,
              #0a5c27 0 65px,
              transparent 66px
            ),
            radial-gradient(
              circle at 42% 55%,
              #075322 0 75px,
              transparent 76px
            ),
            radial-gradient(
              circle at 59% 70%,
              #0b6129 0 70px,
              transparent 71px
            ),
            radial-gradient(
              circle at 75% 55%,
              #075522 0 70px,
              transparent 71px
            ),
            radial-gradient(
              circle at 90% 75%,
              #06451f 0 75px,
              transparent 76px
            );
        }

        /* Waterfall */

        .waterfall {
          position: absolute;
          right: 7%;
          bottom: 230px;
          width: 80px;
          height: 185px;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.2),
            white,
            rgba(255,255,255,0.3)
          );
          clip-path: polygon(
            20% 0,
            80% 0,
            100% 100%,
            0 100%
          );
          filter: blur(0.5px);
        }

        .waterfall::after {
          content: "";
          position: absolute;
          bottom: -12px;
          left: -35px;
          width: 150px;
          height: 35px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          filter: blur(8px);
        }

        /* Road */

        .road {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 250px;
          background: #333;
          clip-path: polygon(
            30% 100%,
            45% 45%,
            60% 35%,
            100% 100%
          );
        }

        .road-line {
          position: absolute;
          bottom: 15px;
          left: 54%;
          width: 8px;
          height: 150px;
          background: #f5eec5;
          transform: rotate(9deg);
          box-shadow:
            0 -45px #f5eec5,
            0 -90px #f5eec5;
        }

        /* =========================================
           POSTER CONTENT
        ========================================= */

        .poster-text {
          position: absolute;
          z-index: 20;
          top: 30px;
          left: 28px;
          width: 48%;
        }

        .bsh-logo {
          display: inline-block;
          margin-bottom: 5px;
          font-size: 62px;
          line-height: 0.8;
          font-weight: 1000;
          letter-spacing: -8px;
          color: #050505;
        }

        .bsh-logo span {
          color: #e8b800;
          font-size: 18px;
          letter-spacing: 0;
          vertical-align: top;
        }

        .services {
          font-size: 12px;
          letter-spacing: 8px;
          color: #222;
          margin-left: 5px;
        }

        .araku-title {
          margin: 12px 0 0;
          font-size: clamp(48px, 8vw, 82px);
          line-height: 0.82;
          font-weight: 1000;
          letter-spacing: -3px;
          color: #07551e;
          text-transform: uppercase;
        }

        .nature-title {
          margin: 20px 0 12px;
          font-family: cursive;
          font-size: clamp(25px, 4vw, 39px);
          font-style: italic;
          color: #111;
        }

        .explore-label {
          display: inline-block;
          padding: 9px 15px;
          border-radius: 25px;
          background: #07551e;
          color: white;
          font-size: 14px;
          font-weight: 900;
        }

        .description {
          margin-top: 10px;
          color: #111;
          font-size: 13px;
          line-height: 1.35;
          font-weight: 600;
        }

        /* Places */

        .places {
          margin-top: 12px;
          width: 100%;
        }

        .place {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 0;
          border-bottom: 1px dotted rgba(255,255,255,0.7);
          color: white;
          font-size: 12px;
          font-weight: 900;
          text-shadow: 1px 1px 4px black;
        }

        .place-icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 2px solid #f5c400;
          border-radius: 50%;
          background: #07551e;
          font-size: 15px;
        }

        /* =========================================
           CSS TAXI
        ========================================= */

        .taxi {
          position: absolute;
          z-index: 30;
          right: 3%;
          bottom: 45px;
          width: 53%;
          height: 175px;
        }

        .taxi-body {
          position: absolute;
          bottom: 20px;
          width: 100%;
          height: 85px;
          border-radius: 25px 35px 18px 18px;
          background: linear-gradient(
            180deg,
            #ffffff,
            #e8e8e8
          );
          border: 3px solid #222;
          box-shadow: 0 8px 15px rgba(0,0,0,0.4);
        }

        .taxi-roof {
          position: absolute;
          top: 20px;
          left: 22%;
          width: 52%;
          height: 65px;
          border-radius: 60px 60px 0 0;
          background: #f3f3f3;
          border: 3px solid #222;
          border-bottom: none;
        }

        .taxi-window {
          position: absolute;
          top: 27px;
          left: 27%;
          width: 22%;
          height: 43px;
          border-radius: 30px 5px 3px 3px;
          background: linear-gradient(
            135deg,
            #1d3740,
            #7ba0aa
          );
          border: 2px solid #111;
        }

        .taxi-window-2 {
          left: 51%;
          border-radius: 5px 30px 3px 3px;
        }

        .taxi-grille {
          position: absolute;
          right: 2%;
          top: 25px;
          width: 17%;
          height: 45px;
          border-radius: 10px;
          background: repeating-linear-gradient(
            0deg,
            #111 0 5px,
            #333 5px 8px
          );
          border: 2px solid #111;
        }

        .taxi-light {
          position: absolute;
          right: 0;
          top: 18px;
          width: 18px;
          height: 25px;
          border-radius: 50%;
          background: #f4f4d0;
          border: 2px solid #333;
        }

        .taxi-wheel {
          position: absolute;
          bottom: 0;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #111;
          border: 8px solid #555;
        }

        .wheel-1 {
          left: 15%;
        }

        .wheel-2 {
          right: 12%;
        }

        .taxi-stripe {
          position: absolute;
          right: 8%;
          bottom: 62px;
          width: 37%;
          height: 22px;
          background: repeating-linear-gradient(
            135deg,
            #f4c400 0 12px,
            #111 12px 24px
          );
        }

        .taxi-sign {
          position: absolute;
          top: 0;
          left: 43%;
          width: 55px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5c400;
          color: #111;
          font-size: 11px;
          font-weight: 1000;
          border-radius: 8px 8px 2px 2px;
          border: 2px solid #222;
        }

        /* =========================================
           24/7
        ========================================= */

        .service-247 {
          position: absolute;
          top: 38px;
          right: 22px;
          z-index: 25;
          text-align: center;
          color: #111;
          font-weight: 1000;
        }

        .clock {
          font-size: 45px;
          display: block;
        }

        .service-number {
          font-size: 35px;
          line-height: 0.9;
        }

        .service-text {
          font-size: 17px;
        }

        .anytime {
          margin-top: 8px;
          padding: 6px 15px;
          border-radius: 20px;
          background: #f5c400;
          font-size: 12px;
        }

        /* =========================================
           BOTTOM CONTACT BAR
        ========================================= */

        .bottom-bar {
          position: relative;
          z-index: 50;
          display: grid;
          grid-template-columns: 1.7fr repeat(4, 1fr);
          align-items: center;
          min-height: 105px;
          padding: 10px 14px;
          background: #06451f;
          color: white;
        }

        .phone-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .phone-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          background: #f5c400;
          color: #06451f;
          font-size: 25px;
        }

        .call-text {
          color: #f5c400;
          font-size: 14px;
          font-weight: 900;
        }

        .phone-number {
          margin-top: 2px;
          font-size: clamp(20px, 3vw, 30px);
          font-weight: 1000;
          letter-spacing: 1px;
        }

        .feature {
          min-height: 70px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          border-left: 1px solid rgba(255,255,255,0.35);
          text-align: center;
        }

        .feature-icon {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #f5c400;
          border-radius: 50%;
          color: #f5c400;
          font-size: 16px;
        }

        .feature-text {
          font-size: 9px;
          line-height: 1.1;
          font-weight: 900;
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 700px) {
          .araku-popup-overlay {
            padding: 8px;
          }

          .araku-poster {
            width: 100%;
            max-height: 97vh;
            border-radius: 12px;
          }

          .araku-scene {
            height: 590px;
          }

          .poster-text {
            top: 22px;
            left: 18px;
            width: 55%;
          }

          .bsh-logo {
            font-size: 45px;
          }

          .services {
            font-size: 8px;
            letter-spacing: 5px;
          }

          .araku-title {
            font-size: 52px;
          }

          .nature-title {
            font-size: 23px;
          }

          .explore-label {
            font-size: 10px;
          }

          .description {
            font-size: 10px;
          }

          .place {
            font-size: 9px;
            padding: 5px 0;
          }

          .place-icon {
            width: 25px;
            height: 25px;
            font-size: 11px;
          }

          .service-247 {
            top: 25px;
            right: 10px;
          }

          .clock {
            font-size: 30px;
          }

          .service-number {
            font-size: 25px;
          }

          .service-text {
            font-size: 12px;
          }

          .anytime {
            font-size: 9px;
            padding: 5px 8px;
          }

          .taxi {
            width: 58%;
            height: 130px;
            bottom: 40px;
          }

          .taxi-body {
            height: 65px;
          }

          .taxi-roof {
            height: 48px;
          }

          .taxi-window {
            top: 24px;
            height: 30px;
          }

          .taxi-window-2 {
            top: 24px;
          }

          .taxi-wheel {
            width: 38px;
            height: 38px;
            border-width: 6px;
          }

          .bottom-bar {
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 0;
            min-height: 100px;
          }

          .phone-area {
            grid-column: 1 / -1;
            justify-content: center;
            padding-bottom: 8px;
          }

          .phone-icon {
            width: 38px;
            height: 38px;
            font-size: 19px;
          }

          .call-text {
            font-size: 10px;
          }

          .phone-number {
            font-size: 21px;
          }

          .feature {
            min-height: 45px;
          }

          .feature-icon {
            width: 27px;
            height: 27px;
            font-size: 12px;
          }

          .feature-text {
            font-size: 7px;
          }
        }

        @media (max-width: 420px) {
          .araku-scene {
            height: 540px;
          }

          .poster-text {
            width: 58%;
          }

          .araku-title {
            font-size: 43px;
          }

          .nature-title {
            font-size: 19px;
          }

          .places {
            margin-top: 7px;
          }

          .place {
            font-size: 8px;
            padding: 4px 0;
          }

          .taxi {
            width: 56%;
            right: 0;
          }

          .service-247 {
            transform: scale(0.8);
            transform-origin: top right;
          }

          .bottom-bar {
            padding: 8px 5px;
          }

          .phone-number {
            font-size: 18px;
          }
        }

        @keyframes arakuFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes arakuPopup {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>

      <div
        className="araku-popup-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setOpen(false);
          }
        }}
      >
        <div className="araku-poster">

          {/* CLOSE */}
          <button
            className="araku-close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ×
          </button>

          {/* ======================================
              MAIN POSTER SCENE
          ====================================== */}

          <div className="araku-scene">

            {/* Clouds */}
            <div className="cloud cloud-1" />
            <div className="cloud cloud-2" />
            <div className="cloud cloud-3" />

            {/* Mountains */}
            <div className="mountain mountain-1" />
            <div className="mountain mountain-2" />
            <div className="mountain mountain-3" />

            {/* Fog */}
            <div className="fog" />

            {/* Trees */}
            <div className="trees" />

            {/* Waterfall */}
            <div className="waterfall" />

            {/* Road */}
            <div className="road">
              <div className="road-line" />
            </div>

            {/* ==================================
                LEFT TEXT
            ================================== */}

            <div className="poster-text">

              <div className="bsh-logo">
                BSH<span>🚕</span>
              </div>

              <div className="services">
                SERVICES
              </div>

              <h1 className="araku-title">
                ARAKU
                <br />
                VALLEY
              </h1>

              <div className="nature-title">
                Let's Explore Nature 🌿
              </div>

              <div className="explore-label">
                📍 ESCAPE. EXPLORE. ENJOY.
              </div>

              <div className="description">
                Enjoy the scenic beauty of Araku Valley
                <br />
                with comfortable & safe rides.
              </div>

              <div className="places">

                <div className="place">
                  <span className="place-icon">⛰</span>
                  BORRA CAVES
                </div>

                <div className="place">
                  <span className="place-icon">💧</span>
                  KATIKI WATERFALLS
                </div>

                <div className="place">
                  <span className="place-icon">⛰</span>
                  GALIKONDA VIEW POINT
                </div>

                <div className="place">
                  <span className="place-icon">🌳</span>
                  PADMAPURAM GARDENS
                </div>

                <div className="place">
                  <span className="place-icon">•••</span>
                  & MORE BEAUTIFUL PLACES
                </div>

              </div>
            </div>

            {/* ==================================
                24/7 SERVICE
            ================================== */}

            <div className="service-247">
              <span className="clock">◷</span>

              <div className="service-number">
                24/7
              </div>

              <div className="service-text">
                SERVICE
              </div>

              <div className="anytime">
                ANYTIME, ANYWHERE
              </div>
            </div>

            {/* ==================================
                CSS TAXI
            ================================== */}

            <div className="taxi">

              <div className="taxi-sign">
                TAXI
              </div>

              <div className="taxi-roof" />

              <div className="taxi-window" />
              <div className="taxi-window taxi-window-2" />

              <div className="taxi-body">

                <div className="taxi-grille" />

                <div className="taxi-light" />

                <div className="taxi-stripe" />

              </div>

              <div className="taxi-wheel wheel-1" />
              <div className="taxi-wheel wheel-2" />

            </div>

          </div>

          {/* ======================================
              BOTTOM CONTACT BAR
          ====================================== */}

          <div className="bottom-bar">

            <div className="phone-area">

              <div className="phone-icon">
                ☎
              </div>

              <div>
                <div className="call-text">
                  CALL / WHATSAPP
                </div>

                <div className="phone-number">
                  88868 03322
                </div>
              </div>

            </div>

            <div className="feature">
              <div className="feature-icon">
                ✓
              </div>

              <div className="feature-text">
                SAFE &<br />
                RELIABLE
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                ♙
              </div>

              <div className="feature-text">
                COMFORTABLE<br />
                RIDES
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                ★
              </div>

              <div className="feature-text">
                EXPERIENCED<br />
                DRIVERS
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                ✓
              </div>

              <div className="feature-text">
                BEST PRICE<br />
                GUARANTEED
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default ArakuPopup;