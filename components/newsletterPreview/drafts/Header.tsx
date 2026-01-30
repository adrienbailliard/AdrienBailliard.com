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
    if (dataCount === undefined)
        return (<h5 className="mb-5">{ title.hasItems }</h5>);

    return (
        <div className="flex justify-between items-center">
            { dataCount === 0
                ? <h5>{ title.isEmpty }</h5>
                : <h5 className="mb-5">{ title.hasItems }</h5>
            }
            { showCreate && (
                <Link href={ `${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${DRAFT_CREATION_SLUG}` } className='text-primary font-medium'>
                    Créer
                </Link>
            )}
        </div>
    );
}