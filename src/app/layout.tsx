import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const viewport: Viewport = {
  themeColor: "#2d5a3d",
};

export const metadata: Metadata = {
  title: "Bristol Forage — Wild Edible Plant Discovery",
  description:
    "Discover wild edible plants across Bristol. Interactive map, field guide, seasonal calendar and community sightings.",
  manifest: "/manifest.json",
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  openGraph: {
    title: "Bristol Forage — Wild Edible Plant Discovery",
    description:
      "Discover wild edible plants across Bristol. Interactive map, field guide, seasonal calendar and community sightings.",
    type: "website",
    locale: "en_GB",
    siteName: "Bristol Forage",
  },
  twitter: {
    card: "summary",
    title: "Bristol Forage — Wild Edible Plant Discovery",
    description:
      "Discover wild edible plants across Bristol. Interactive map, field guide and community sightings.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bristol Forage",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
        />
      </head>
      <body className="font-sans antialiased">
        <Nav />
        <main className="pt-12">{children}</main>
      </body>
    </html>
  );
}
