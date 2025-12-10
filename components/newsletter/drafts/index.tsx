"use client";

import useSWR from 'swr';
import { useAuth } from '@/context/authentification';
import { NewsletterDraftPreview } from '@/lib/types';

import Header from "@/components/newsletter/drafts/Header";
import DraftCard from "@/components/newsletter/drafts/DraftCard";


const fetcher = (url: string) =>
    fetch(url).then(r => r.json());


export default function NewsletterDrafts()
{
    const { isAdmin } = useAuth();

    if (!isAdmin)
        return null;

    const { data } = useSWR<NewsletterDraftPreview[]>(`/api/newsletter/draft/previews`, fetcher);
    const safeData = Array.isArray(data) ? data : null;


    return (
        <section className="text-light-fg bg-dark-bg pb-0">
            <div>
                <Header dataCount={safeData?.length}/>
                <div className='max-h-[65svh] overflow-y-auto'>
                    {
                        safeData
                        ? safeData.map((preview, i) => <DraftCard draft={preview} key={i}/>)
                        : <></>
                    }
                </div>
            </div>
        </section> 
    );
}