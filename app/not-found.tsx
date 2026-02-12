import Link from "@/components/ui/Link";
import { getUtilityMetadata } from "@/lib/seo/metadata";



export const metadata = getUtilityMetadata("Destination Inconnue");


export default function NotFound()
{
  return (
    <main className="bg-dark-bg">
      <section className="hero text-center">
        <h2>Cette Destination est Inconnue</h2>
        <Link href="/" variant="primary">
          { "Retour à la Base" }
        </Link>
      </section>
    </main>
  );
}