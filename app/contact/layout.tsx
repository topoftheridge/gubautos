import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact GubMotors | Bucks County Used Car Dealer",
  description:
    "Get in touch with GubMotors in Bucks County, PA. Questions about vehicles, financing, trade-ins, or test drives — we respond fast. Call (732) 555-0192 or send a message.",
  keywords: [
    "contact GubMotors",
    "used car dealer Bucks County",
    "car dealership contact",
    "auto financing questions",
    "trade in my car Bucks County",
  ],
  openGraph: {
    title: "Contact GubMotors | Bucks County Used Car Dealer",
    description: "Reach GubMotors in Bucks County, PA. Real people, fast replies. Call, text, or send a message.",
    url: "https://gubmotors.com/contact",
    siteName: "GubMotors",
    type: "website",
  },
  alternates: { canonical: "https://gubmotors.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
