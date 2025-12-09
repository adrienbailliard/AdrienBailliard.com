import Link from "next/link";


type HeaderProps = {
    dataCount: number | undefined;
}


export default function Header({ dataCount }: HeaderProps)
{
    if (dataCount === undefined)
        return (<h5>Brouillons</h5>);

    return (
        <div className="flex justify-between items-center">
            <h5>{ dataCount === 0 ? "Aucun Brouillon" : "Brouillons" }</h5>
            <Link href="/newsletter" className='text-primary font-medium'>
                Créer
            </Link>
        </div>
    );
}