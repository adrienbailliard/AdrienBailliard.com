import { cache } from 'react';
import { Metadata } from 'next';
import { notFound } from "next/navigation";

import { getUtilityMetadata } from "@/lib/seo/metadata";

import authConfig from "@/config/auth";
import { verifyJWT } from '@/lib/security';

import SubscriptionToggle from "@/components/newsletter/SubscriptionToggle";
import { isSubscribed } from "@/lib/db/subscribers";



type SearchParameters = Promise<{ [key: string]: string | string[] | undefined }>;


const getValidData = cache(
  async (searchParams: SearchParameters) => {
    const params = await searchParams;
    const jwt = params[authConfig.cookie.name];

    if (!jwt || typeof jwt !== 'string')
      notFound();

    const payload = await verifyJWT(jwt);

    if (!payload)
      notFound();

    const isActive = await isSubscribed(payload.email);
    return { jwt, isSubscribed: isActive };
  }
);



export async function generateMetadata({ searchParams }: { searchParams: SearchParameters }): Promise<Metadata>
{
  await getValidData(searchParams);
  return getUtilityMetadata("Préférences");
}



export default async function NewsletterPage({ searchParams }: { searchParams: SearchParameters })
{
  const { jwt, isSubscribed } = await getValidData(searchParams);

  return (
    <main className="bg-dark-bg">
      <section className="hero text-center">
        <h2>Gère ton abonnement</h2>
        <SubscriptionToggle jwt={jwt} isSubscribed={isSubscribed}/>
      </section>
    </main>
  );
}