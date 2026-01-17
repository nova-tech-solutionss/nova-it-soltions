import "../globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";
import AOSInit from "../components/AOSProvider";
import SeoSchema from "../components/SeoSchema";


config.autoAddCss = false;

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-5WN9CP1ND8"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5WN9CP1ND8');
        `}
      </Script>

      <AOSInit />
      <NavBar />
      {children}
      <Footer />
      <SeoSchema />
    </>
  );
}

