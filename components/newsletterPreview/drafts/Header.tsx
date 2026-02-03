import Link from "next/link";
import { DRAFT_CREATION_SLUG, NEWSLETTER_ROUTE, ADMIN_ROUTE } from "@/lib/constants";



type HeaderProps = {
    dataCount: number | undefined;
    title: {
        hasItems: string;
        isEmpty: string;
    };
    showCreate: boolean;
}


export default function Header({ dataCount, title, showCreate }: HeaderProps)
{
    const isEmpty = dataCount === 0;

    return (
        <div className={ `flex justify-between items-center ${ isEmpty ? "" : "mb-5" }` }>
            <h5>{ isEmpty ? title.isEmpty : title.hasItems }</h5>

            { showCreate && (
                <Link href={ `${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${DRAFT_CREATION_SLUG}` } className='text-primary font-medium'>
                    Créer
                </Link>
            )}
        </div>
    );
}