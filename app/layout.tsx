import "./globals.css";
import React from "react";
import { cookies } from 'next/headers';
import { Nunito, Plus_Jakarta_Sans } from 'next/font/google'

import Header from "@/components/header";
import Footer from "@/components/Footer";

import { isAdminLoginToken } from '@/lib/adminAuth';
import site from '@/config/site';


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
  const token = cookieStore.get(site.adminCookie.name)?.value;
  const isAdmin = token ? await isAdminLoginToken(token) : false;

  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className={`${plusJakartaSans.variable} ${nunito.variable}`}>
        <Header isAdmin={isAdmin}/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
