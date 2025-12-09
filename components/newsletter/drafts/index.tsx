"use client";

import useSWR from 'swr';
import { useAuth } from '@/context/authentification';
import { NewsletterDraft } from '@/lib/types';

import Header from "@/components/newsletter/drafts/Header";


const fetcher = (url: string) =>
    fetch(url).then(r => r.json());


export default function NewsletterDrafts()
{
    const { isAdmin } = useAuth();

    if (!isAdmin)
        return null;

    const { data } = useSWR<NewsletterDraft[]>(`/api/newsletter/drafts`, fetcher);
    const safeData = Array.isArray(data) ? data : null;


    return (
        <section className="text-light-fg bg-dark-bg pb-0">
            <div>
                <Header dataCount={safeData?.length}/>
            </div>
        </section> 
    );
}