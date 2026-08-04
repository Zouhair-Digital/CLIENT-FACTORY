import Script from "next/script";

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID;
const GTAG_SECONDARY_ID = process.env.NEXT_PUBLIC_GTAG_SECONDARY_ID;

export default function TrackingScripts() {
  return (
    <>
      {GTAG_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTAG_ID}');
              ${GTAG_SECONDARY_ID ? `gtag('config', '${GTAG_SECONDARY_ID}');` : ""}
            `}
          </Script>
        </>
      )}
    </>
  );
}
