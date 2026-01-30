import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { cache } from 'react';

import { metadata } from "@/app/not-found";
import { getUtilityMetadata } from "@/lib/seo/metadata";

import authConfig from "@/config/auth";
import { verifyJWT } from '@/lib/security';

import SubscriptionToggle from "@/components/newsletter/SubscriptionToggle";
import { isSubscribed } from "@/lib/db/subscribers";



const getValidData = cache(
  async (searchParams: NewsletterPageProps['searchParams']) => {
    const params = await searchParams;
    const jwt = params[authConfig.cookie.name];

    if (!jwt || typeof jwt !== 'string')
      return null;

    const payload = await verifyJWT(jwt);

    if (!payload)
      return null;

    const isActive = await isSubscribed(payload.email);

    return { jwt, isSubscribed: isActive };
  }
);



export async function generateMetadata({ searchParams }: NewsletterPageProps): Promise<Metadata>
{
  const data = await getValidData(searchParams);

  if (!data)
    return metadata;

  return getUtilityMetadata("Préférences");
}



type NewsletterPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};


export default async function NewsletterPage({ searchParams }: NewsletterPageProps)
{
  const data = await getValidData(searchParams);

  if (!data)
    notFound();


  return (
    <main className="bg-dark-bg">
      <section className="hero text-center">
        <h2>Gère ton abonnement</h2>
        <SubscriptionToggle jwt={data.jwt} isSubscribed={data.isSubscribed}/>
      </section>
    </main>
  );
}