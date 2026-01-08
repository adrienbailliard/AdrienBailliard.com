import Link from "next/link";
import { PageEntries } from "@/config/navigation";


interface DesktopNavProps
{
    getLinkClass: (href: string) => string;
    pageEntries: PageEntries;
}


export default function DesktopMenu({ pageEntries, getLinkClass }: DesktopNavProps)
{
    return (
        <div className="hidden lg:flex gap-8 xl:gap-11">
            {
                pageEntries.map(([key, value], index) =>
                    index > 0 && index < pageEntries.length - 2
                    ? (
                        <Link
                            key={key}
                            href={key}
                            className={getLinkClass(key)}
                        >
                            { value }
                        </Link>
                    )
                    : null
                )
            }
        </div>
    );
}