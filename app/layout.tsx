import "./globals.css";
import { cookies } from 'next/headers';
import { Nunito, Plus_Jakarta_Sans } from 'next/font/google'

import Header from "@/components/header";
import Footer from "@/components/Footer";

import site from '@/config/site';
import { AuthProvider } from '@/context/authentification';


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
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get(site.adminCookie.name);

  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className={`${plusJakartaSans.variable} ${nunito.variable}`}>
        <AuthProvider initialIsAdmin={ adminCookie !== undefined }>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
