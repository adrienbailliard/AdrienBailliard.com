import Image from "next/image";

import site from "@/config/site";
import newsletterConfig from "@/config/newsletter";

import { formatPublicDate } from "@/lib/utils";



export function NewsletterTitle({ value }: { value: string })
{
    return <h2>{ newsletterConfig.slogan }{ value }</h2>;
};



type ViewProps = {
  title: React.ReactNode;
  content: React.ReactNode;
  date: Date | string;
};


export default function View({ title, content, date }: ViewProps)
{
    return (
        <>
            <section className="bg-dark-bg text-light-fg">
                <div className="text-center max-w-4xl">
                    { title }
                    <div className="flex justify-center items-center gap-7 edition-date">
                        <Image
                            src={ `${site.illustrationsFolder}profile-picture.png` }
                            alt="Adrien Bailliard"
                            width={56}
                            height={56}
                            className="illustrations"
                            preload={true}
                        />
                        <time>
                            { formatPublicDate(date) }
                        </time>
                    </div>
                </div>
            </section>

            <article className="bg-light-bg text-dark-fg">
                <div className="max-w-4xl">
                    { content }
                </div>
            </article>
        </>
    );
}