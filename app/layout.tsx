import "./globals.css";
import { Nunito, Plus_Jakarta_Sans } from 'next/font/google'

import Header from "@/components/header";
import Footer from "@/components/Footer";

import { AuthProvider } from '@/contexts/authentification';


const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-sans'
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display'
});


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>)
{
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className={`${plusJakartaSans.variable} ${nunito.variable}`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}