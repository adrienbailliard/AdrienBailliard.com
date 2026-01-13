"use client";

import useSWR from 'swr';
import { useAuth } from '@/context/authentification';
import { SerializedNewsletterPreview } from '@/lib/types';

import Header from "./Header";
import PreviewCard from "./PreviewCard";
import SkeletonCard from "./SkeletonCard";


const fetcher = (url: string) =>
    fetch(url).then(r => r.json());


export default function NewsletterDrafts()
{
    const { isAdmin } = useAuth();
    const { data } = useSWR<SerializedNewsletterPreview[]>(isAdmin ? `/api/newsletter/drafts` : null, fetcher);

    if (!isAdmin)
        return null;

    const safeData = Array.isArray(data) ? data : null;
    const now = new Date();


    return (
        <section className="text-light-fg bg-dark-bg">
            <div>
                <Header dataCount={safeData?.length}/>
                {
                    safeData
                    ? safeData.map((preview, i) => <PreviewCard draft={preview} now={now} key={i}/>)
                    : [...Array(3)].map((_, i) => <SkeletonCard key={i}/>)
                }
            </div>
        </section> 
    );
}