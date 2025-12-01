"use client";

import useSWR from 'swr';
import { useAuth } from '@/context/authentification';
import { Message } from '@/lib/types';



interface StatCardProps {
  message?: Message;
}

function MessageCard({ message }: StatCardProps)
{
    return (
        <div>
            {
                message
                ? (
                    <>
                        
                    </>
                )
                : (
                    <>
                        
                    </>
                )
            }
        </div>
    );
}



const fetcher = (url: string) => fetch(url).then(r => r.json());


export default function LastMessages()
{
    const { isAdmin } = useAuth();

    if (!isAdmin)
        return null;


    const { data } = useSWR<Message[]>(`/api/messages/last`, fetcher);

    return (
        <section className="text-light-fg bg-dark-bg pt-0">
            <div>
                <h5>
                    Derniers Messages
                </h5>
                <div className='inset-border contact'>
                    {
                        Array.isArray(data)
                        ? data.map((message, i) => <MessageCard message={message} key={i}/>)
                        : [...Array(4)].map((_, i) => <MessageCard key={i}/>)
                    }
                </div>
            </div>
        </section>
    );
}