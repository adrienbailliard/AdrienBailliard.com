import Form from '@/components/ui/BaseForm';
import AutoMonday from "@/components/icons/autoMonday";



export default function Signup()
{
    return (
        <section className="bg-dark-bg text-light-fg">
            <div className="flex max-lg:flex-col items-center lg:justify-between gap-10 lg:gap-20">
            <div className="max-lg:text-center">
                <h1>
                <AutoMonday className="max-lg:w-full h-17.5 max-lg:m-auto max-sm:h-12.5 max-md:h-15"/>
                </h1>
                <p className="max-w-xl">
                { "Une approche ne vaut rien sans méthode. Chaque lundi, une clé pour automatiser comme le Top\u00A01%." }
                </p>
            </div>
            <Form
                className="max-w-md max-sm:w-full sm:min-w-0"
            >
                { "Rejoins" }
            </Form>
            </div>
        </section>
    );
}