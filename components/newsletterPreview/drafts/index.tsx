"use client";

import useSWR from 'swr';
import { useAuth } from '@/context/authentification';
import { SerializedNewsletterPreview } from '@/lib/types';

import Header from "./Header";
import PreviewCard from "./PreviewCard";
import SkeletonCard from "./SkeletonCard";



const fetcher = (url: string) =>
    fetch(url).then(r => r.json());


type NewsletterListProps = {
    title: {
        hasItems: string;
        isEmpty: string;
    };
    apiUrl: string;
    showCreate?: boolean;
    className?: string;
}


export default function NewsletterList({ title, apiUrl, showCreate = false, className }: NewsletterListProps)
{
    const { isAdmin } = useAuth();
    const { data } = useSWR<SerializedNewsletterPreview[]>(isAdmin ? apiUrl : null, fetcher);

    if (!isAdmin)
        return null;

    const safeData = Array.isArray(data) ? data : null;


    return (
        <section className={`text-light-fg bg-dark-bg ${className}`}>
            <div>
                <Header
                    dataCount={safeData?.length}
                    title={title}
                    showCreate={showCreate}
                />
                {
                    safeData
                        ? safeData.map((preview, i) =>
                            <PreviewCard draft={preview} key={i}/>)
                        : [...Array(3)].map((_, i) => <SkeletonCard key={i}/>)
                }
            </div>
        </section> 
    );
}