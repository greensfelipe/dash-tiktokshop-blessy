import type { Metadata } from "next";
import { Bricolage_Grotesque, Poppins } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Blessy — War Room 4.4 TikTok Shop",
  description: "Dashboard de performance — War Room 4.4 TikTok Shop Blessy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
