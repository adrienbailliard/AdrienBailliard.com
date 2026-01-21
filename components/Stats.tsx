"use client";

import useSWR from 'swr';
import { useAuth } from '@/context/authentification';
import { StatResponse } from '@/lib/types';


const fetcher = (url: string) => fetch(url).then(r => r.json());

interface StatsProps {
  type: 'guide' | 'newsletter' | 'messages';
}

interface StatCardProps {
  stat: StatResponse;
}



function StatCard({ stat }: StatCardProps)
{
    return (
        <div className='stat-card'>
            <h4 className='font-bold'>{ stat.value }</h4>
            <span className="text-light-muted-fg text-sm">{ stat.label }</span>
        </div>
    );
}


function StatSkeletonCard()
{
    return (
        <div className='stat-card animate-pulse'>
            <div className='h-6 md:h-7.5 w-8 md:w-10 mb-3 rounded-lg max-md:mx-auto bg-light-fg'/>
            <div className='h-3.5 w-20 md:w-25 rounded-lg bg-light-muted-fg'/>
        </div>
    );
}


export default function Stats({ type }: StatsProps)
{
    const { isAdmin } = useAuth();
    const { data } = useSWR<StatResponse[]>(isAdmin ? `/api/${type}/stats` : null, fetcher);

    if (!isAdmin)
        return null;

    const stats = Array.isArray(data)
        ? data.map((stat, i) => <StatCard stat={stat} key={i}/>)
        : [...Array(3)].map((_, i) => <StatSkeletonCard key={i}/>)


    return (
        <section className="text-light-fg bg-dark-bg">
            <div className="flex max-md:gap-7 max-md:flex-col justify-center">
                { stats }
            </div>
        </section>
    );
}