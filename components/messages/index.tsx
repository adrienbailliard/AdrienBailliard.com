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

    if (!isAdmin)
        return null;

    const { data, mutate } = useSWR<Message[]>(`/api/messages`, fetcher);
    const now = new Date();


    return (
        <section className="text-light-fg bg-dark-bg pb-0">
            <div className='overflow-x-hidden'>
                <MessageActionsProvider>
                    <Header data={data} mutateMessages={mutate}/>
                    <div className='max-h-[50svh] overflow-y-auto'>
                        {
                            data
                            ? data.map((message, i) => <MessageCard message={message} now={now} key={message.id}/>)
                            : [...Array(4)].map((_, i) => <MessageSkeletonCard key={i}/>)
                        }
                    </div>
                </MessageActionsProvider>
            </div>
        </section>
    );
}