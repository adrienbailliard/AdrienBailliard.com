import Link from "next/link";
import Linkedin from "@/components/icons/linkedin";
import pageMapping from "@/config/pageMapping";

import site from "@/config/site";



export default function Footer()
{
  return (
    <footer className="bg-dark-elevated-bg pt-12 pb-9 xl:pt-16 xl:pb-12">
      <div>
          <nav
            role="navigation"
            className="flex items-center max-xl:flex-col max-xl:gap-5"
          >
          <Link href="/" className="text-lg font-medium basis-3/16 uppercase">
            { site.name }
          </Link>
          <div className="flex gap-x-6 md:gap-x-11 gap-y-1 basis-5/8 justify-center flex-wrap">
            {
                Array.from(pageMapping.entries()).map(([key, value], index) =>
                    index > 0 && index < pageMapping.size - 1
                    ? (
                        <Link
                            key={key}
                            href={key}
                        >
                            {value.name}
                        </Link>
                    )
                    : null
                )
            }
          </div>
          <div className="basis-3/16 flex justify-end">
            <a
              href="https://www.linkedin.com/in/adrienbailliard/"
              target="_blank"
              aria-label="Profil LinkedIn d'Adrien Bailliard"
              className="flex justify-center items-center w-10.5 h-10.5 xl:-mr-2"
            >
              <Linkedin className="w-6.5"/>
            </a>
          </div>
        </nav>
        <div className="text-xs flex justify-between mt-5 xl:mt-16 max-sm:flex-col-reverse max-sm:items-center max-sm:gap-4 text-center">
          <div className="text-light-muted-text">
            © { new Date().getFullYear() } { site.name }. Tous droits réservés.
          </div>
          <Link href="/conditions-generales" className="font-medium">
            Conditions générales
          </Link>
        </div>
      </div>
    </footer>
  );
}