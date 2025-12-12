export default function SkeletonCard()
{
    return (
        <div className='card-list card-skeleton'>
            <div className='card-skeleton-title' />
            <div className='card-skeleton-time' />
            <div className='text-light-muted-text flex items-center whitespace-pre col-span-full'>
                <div className='rounded-lg w-18 h-4 bg-light-fg' />
                { " - " }
                <div className='card-skeleton-container' />
            </div>
        </div>
    );
}