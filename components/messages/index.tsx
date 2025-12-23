"use client";
import useSWR from 'swr';

import { useAuth } from '@/context/authentification';
import { MessageActionsProvider } from '@/context/messageActions';
import { Message } from '@/lib/types';

import Header from "@/components/messages/Header";
import MessageCard from "@/components/messages/MessageCard";
import MessageSkeletonCard from "@/components/messages/SkeletonCard";


const fetcher = (url: string) =>
    fetch(url).then(r => r.json());


export default function Messages()
{
    const { isAdmin } = useAuth();
    const { data, mutate } = useSWR<Message[]>(isAdmin ? `/api/messages` : null, fetcher);

    if (!isAdmin)
        return null;

    const safeData = Array.isArray(data) ? data : null;
    const now = new Date();


    const performOptimisticAction = async (newData: Message[], apiCall: Promise<Response>) =>
    {
        const previousData = Array.isArray(data) ? [...data] : [];
        mutate(newData, { revalidate: false });

        try {
            const response = await apiCall;

            if (!response.ok)
                throw new Error();
        }
        catch {
            mutate(previousData, { revalidate: false });
            mutate();
        }
    };


    return (
        <section className="text-light-fg bg-dark-bg">
            <div className='overflow-x-hidden'>
                <MessageActionsProvider>
                    <Header
                        data={safeData}
                        mutateMessages={mutate}
                        onOptimisticAction={performOptimisticAction}
                    />
                    {
                        safeData
                        ? safeData.map((message, i) => <MessageCard message={message} now={now} currentData={safeData}
                            key={message.id} onOptimisticAction={performOptimisticAction}/>)
                        : [...Array(3)].map((_, i) => <MessageSkeletonCard key={i}/>)
                    }
                </MessageActionsProvider>
            </div>
        </section>
    );
}