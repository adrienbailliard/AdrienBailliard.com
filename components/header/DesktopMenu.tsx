import Link from "next/link";
import pageMapping from "@/config/pageMapping";


interface DesktopNavProps
{
  getLinkClass: (href: string) => string;
}


export default function DesktopMenu({ getLinkClass }: DesktopNavProps)
{
    return (
        <div className="hidden lg:flex gap-8 xl:gap-11">
            {
                Array.from(pageMapping.entries()).map(([key, value], index) =>
                    index > 0 && index < pageMapping.size - 2
                    ? (
                        <Link
                            key={key}
                            href={key}
                            className={getLinkClass(key)}
                        >
                            {value.name}
                        </Link>
                    )
                    : null
                )
            }
        </div>
    );
}