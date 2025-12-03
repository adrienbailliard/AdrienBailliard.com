import Link from "next/link";
import site from "@/config/site";


export type PreviewProps = {
  title: string;
  paragraph: string;
  date: string;
  href: string;
}


export function Preview({ title, paragraph, href, date }: PreviewProps)
{
    return (
        <Link href={href}>
            <div className="flex max-sm:flex-col sm:gap-8 lg:gap-0 lg:flex-col lg:max-w-md m-auto">
                <div className="bg-dark-bg text-light-fg h-54 sm:h-44 md:h-54 lg:h-64 rounded-md flex items-center justify-center p-8 lg:p-10 sm:basis-1/2 lg:basis-auto">
                    <h4 className="text-center uppercase">
                        <span className="font-extralight">
                            {site.newsletterSlogan}
                        </span>
                        {title}
                    </h4>
                </div>
                <div className="sm:basis-1/2 lg:basis-auto">
                    <p className="text-base text-dark-muted-text max-sm:mt-5 mt-0 lg:mt-5">
                        {date}
                    </p>
                    <h5 className="font-medium mt-2 pb-0">
                        {site.newsletterSlogan + title}
                    </h5>
                    <p className="text-base mt-2">
                        {paragraph}
                    </p>
                </div>
            </div>
        </Link>
    );
}