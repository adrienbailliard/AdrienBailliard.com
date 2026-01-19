export default function SkeletonCard()
{
    return (
        <div className='card-list card-skeleton'>
            <div className='card-skeleton-title' />
            <div className='card-skeleton-time' />
            <div className="flex col-span-full gap-4">
                <div className='card-skeleton-content w-18 bg-light-fg' />
                <div className='card-skeleton-content' />
            </div>
        </div>
    );
}