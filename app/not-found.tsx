import { getIconsMetadata } from "@/lib/seo/metadata";
import Link from "@/components/ui/Link";

export const metadata = {
  title: "Page Introuvable",
  ...getIconsMetadata(),
};

export default function NotFound()
{
  return (
    <main className="bg-dark-bg">
      <section className="hero text-center">
        <h2>Cette Page est Introuvable</h2>
        <Link href="/" variant="primary">
          { "Revenir à l'Accueil" }
        </Link>
      </section>
    </main>
  );
}