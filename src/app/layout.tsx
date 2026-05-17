import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "YatraAI - Smart Travel Itinerary Planner",
  description: "Generate AI-powered travel itineraries for your next adventure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('yatraai-theme') === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body 
        className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col text-foreground transition-colors duration-300 ease-in-out relative overflow-x-hidden`}
        style={{
          backgroundColor: 'white',
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      >
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
