export default function SkeletonCard()
{
    return (
        <div className="newsletter-draft-card-wrapper">
            <div className="newsletter-card-list-icon animate-pulse"/>
            <div className='card-list card-skeleton'>
                <div className='card-skeleton-title' />
                <div className='card-skeleton-time' />
                <div className='card-skeleton-container col-span-full mt-1'/>
            </div>
        </div>
    );
}