import Link from "@/components/ui/Link";


export function Cta()
{
    return (
        <div className="text-center mt-10 md:mt-12 lg:mt-14">
            <Link href="/newsletter" variant="button-primary">
                { "Explore Les Éditions" }
            </Link>
        </div>
    );
}