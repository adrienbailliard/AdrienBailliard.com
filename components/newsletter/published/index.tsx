import { Preview, PreviewProps } from "@/components/newsletter/published/Preview";


type NewslettersProps = {
    title: string;
    data: Array<PreviewProps>
}


export default function Newsletters({ title, data }: NewslettersProps)
{
    return (
        <>
            <h2 className="text-center">
                { title }
            </h2>
            <div className="flex max-lg:flex-col lg:grid grid-cols-2 max-w-6xl mx-auto gap-10 md:gap-12 lg:gap-16">
                {
                    data.map((newsletter, index) => (
                        <Preview
                            key={index}
                            {...newsletter}
                        />
                    ))
                }
            </div>
        </>
    );
}