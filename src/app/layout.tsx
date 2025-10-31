import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agenda de cultura",
  description: "Creá y descubrí los mejores eventos culturales",
  keywords: ["eventos", "cultura", "arte", "música", "teatro", "festivales", "ferias", "fiestas", "agenda cultural", "eventos en vivo", "exposiciones", "conciertos", "talleres", "actividades culturales"],
  authors: [{ name: "Patricio Hogan" }],
  creator: "Patricio Hogan",
  metadataBase: new URL("https://agendadecultura.vercel.app/"),
  openGraph: {
    title: "Agenda de cultura",
    description: "Creá y descubrí los mejores eventos culturales",
    url: "https://agendadecultura.vercel.app/",
    siteName: "Agenda de cultura",
    images: [
      {
        url: "/calendar.svg",
        width: 1200,
        height: 630,
        alt: "Agenda de cultura",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mi App Cultural",
    description: "Descubrí los mejores eventos culturales cerca tuyo.",
    images: ["/calendar.svg"],
  },
  icons: {
    icon: '/calendar.svg', 
    shortcut: '/calendar.svg',
    apple: "/calendar.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
