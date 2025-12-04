export default function SkeletonCard()
{
    return (
        <div className='message-card animate-pulse items-center gap-y-2'>
            <div className='rounded-lg w-25 h-4.5 bg-light-fg'></div>
            <div className='bg-light-muted-text rounded-lg w-8.5 h-4 ml-auto'></div>
            <div className='text-light-muted-text flex items-center whitespace-pre col-span-full'>
                <div className='rounded-lg w-18 h-4 bg-light-fg'></div>
                { " - " }
                <div className='bg-light-muted-text rounded-lg w-full max-w-175 h-4'></div>
            </div>
        </div>
    );
}