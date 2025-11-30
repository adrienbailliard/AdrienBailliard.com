"use client";

import useSWR from 'swr';
import { useAuth } from '@/context/authentification';
import { StatResponse } from '@/lib/types';



interface StatCardProps {
  stat?: StatResponse;
}

function StatCard({ stat }: StatCardProps)
{
    return (
        <div className='flex items-center md:h-[61.5px] md:px-12 lg:px-16'>
            <div>
                {
                    stat
                    ? (
                        <>
                            <h4 className='font-bold'>{stat.value}</h4>
                            <span className="text-light-muted-text text-sm">{stat.label}</span>
                        </>
                    )
                    : (
                        <>
                            <div className='max-md:mx-auto h-6 md:h-7.5 w-8 md:w-10 rounded-md bg-light-fg animate-pulse mb-3'/>
                            <div className='h-3.5 w-20 md:w-25 rounded-md bg-light-muted-text animate-pulse'/>
                        </>
                    )
                }
            </div>
        </div>
    );
}



interface StatsProps {
  type: 'guide' | 'subscribers' | 'messages';
}

const fetcher = (url: string) => fetch(url).then(r => r.json());


export default function Stats({ type }: StatsProps)
{
    const { isAdmin } = useAuth();

    if (!isAdmin)
        return null;


    const { data } = useSWR<StatResponse[]>(`/api/stats/${type}`, fetcher);

    return (
        <section className="text-light-fg bg-dark-bg pb-0">
            <div className="flex max-md:text-center max-md:gap-7 max-md:flex-col max-md:items-center md:justify-center">
                {
                    Array.isArray(data)
                    ? data.map((stat, i) => <StatCard stat={stat} key={i}/>)
                    : [...Array(3)].map((_, i) => <StatCard key={i}/>)
                }
            </div>
        </section>
    );
}