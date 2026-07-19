import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-universalsans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geistmono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAT415 - Matemática IV | Laboratorio de Simulación Interactiva",
  description: "Laboratorio interactivo y simulador de ecuaciones diferenciales, series de Fourier, transformada de Laplace y simulaciones 3D para Matemática IV (MAT415).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-jet-ink">
        {children}
      </body>
    </html>
  );
}
