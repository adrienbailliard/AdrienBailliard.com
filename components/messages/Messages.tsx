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


export default function LastMessages()
{
    const { isAdmin } = useAuth();

    if (!isAdmin)
        return null;

    const { data } = useSWR<Message[]>(`/api/messages`, fetcher);
    const now = new Date();


    return (
        <section className="text-light-fg bg-dark-bg pb-0">
            <div>
                <MessageActionsProvider>
                    <Header data={data} />
                    <div className='divide-y divide-dark-muted-text pt-5'>
                        {
                            data
                            ? data.map((message, i) => <MessageCard message={message} now={now} key={i}/>)
                            : [...Array(3)].map((_, i) => <MessageSkeletonCard key={i}/>)
                        }
                    </div>
                </MessageActionsProvider>
            </div>
        </section>
    );
}