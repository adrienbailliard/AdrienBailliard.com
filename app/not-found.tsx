import Link from "@/components/ui/Link";
import { getUtilityMetadata } from "@/lib/seo/metadata";



export const metadata = getUtilityMetadata("Hors Périmètre");


export default function NotFound()
{
  return (
    <main className="bg-dark-bg">
      <section className="hero text-center">
        <h2>Cette Page est Hors Périmètre</h2>
        <Link href="/" variant="primary">
          { "Retour à la Base" }
        </Link>
      </section>
    </main>
  );
}