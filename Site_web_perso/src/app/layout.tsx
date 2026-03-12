import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--body-font",
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--title-font",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Prestige Motors | L'Exception Automobile",
  description: "Concessionnaire de véhicules de luxe et de collection. Découvrez notre sélection exclusive : Porsche, Ferrari, Lamborghini, Bugatti.",
  keywords: "voiture de luxe, supercar, prestige, collection, porsche, ferrari, paris",
  openGraph: {
    title: "Prestige Motors | L'Exception Automobile",
    description: "Concessionnaire de véhicules de luxe et de collection. Une sélection exclusive pour une clientèle exigeante.",
    url: "https://www.prestigemotors.com/",
    type: "website",
    images: [
      {
        url: "https://www.prestigemotors.com/assets/img/porsche.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prestige Motors | L'Exception Automobile",
    description: "Concessionnaire de véhicules de luxe et de collection.",
    images: ["https://www.prestigemotors.com/assets/img/porsche.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${syne.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
