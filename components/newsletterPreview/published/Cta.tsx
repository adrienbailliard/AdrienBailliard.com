import Link from "@/components/ui/Link";
import { NEWSLETTER_ROUTE } from "@/lib/constants";



export function Cta()
{
    return (
        <div className="text-center mt-10 md:mt-12 lg:mt-14">
            <Link href={NEWSLETTER_ROUTE} variant="light-primary">
                { "Explore Les Éditions" }
            </Link>
        </div>
    );
}