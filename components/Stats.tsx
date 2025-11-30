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
        <div className='px-12 lg:px-16 [&:not(:last-child)]:border-r-2 [&:not(:last-child)]:border-r-dark-muted-text'>
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
                        <div className='h-5.5 md:h-7 w-8 md:w-10 rounded-md bg-light-fg animate-pulse mb-3'/>
                        <div className='h-3 w-20 md:w-25 rounded-md bg-light-muted-text animate-pulse'/>
                    </>
                )
            }
        </div>
    );
}



interface StatsProps {
  type: 'guide' | 'subscribers';
}

const fetcher = (url: string) => fetch(url).then(r => r.json());


export default function Stats({ type }: StatsProps)
{
    const { isAdmin } = useAuth();

    if (!isAdmin)
        return null;


    const { data, isLoading, error } = useSWR<StatResponse[]>(`/api/stats/${type}`, fetcher);

    return (
        <section className="text-light-fg bg-dark-bg pb-0">
            <div className="flex justify-center flex-wrap">
                {
                    isLoading || error
                    ? [...Array(3)].map((_, i) => <StatCard key={i}/>)
                    : data?.map((stat, i) => <StatCard stat={stat} key={i}/>)
                }
            </div>
        </section>
    );
}