import Link from "next/link";
import { DRAFT_CREATION_SLUG } from "@/lib/constants";


type HeaderProps = {
    dataCount: number | undefined;
}


export default function Header({ dataCount }: HeaderProps)
{
    if (dataCount === undefined)
        return (<h5 className="mb-5">Brouillons</h5>);

    return (
        <div className="flex justify-between items-center">
            { dataCount === 0 ? <h5>Aucun Brouillon</h5> : <h5 className="mb-5">Brouillons</h5> }
            <Link href={ `/admin/newsletter/${DRAFT_CREATION_SLUG}` } className='text-primary font-medium'>
                Créer
            </Link>
        </div>
    );
}