import site from "@/config/site";


type PageMapping = {
  name: string,
  title: string,
  description: string
};


const pageMapping: Map<string,
    Omit<PageMapping, "title"> & Partial<PageMapping>> = new Map
([
    [
        "/",
        {
            name: "Accueil",
            title: site.name + " - " + site.description,
            description: "Automatise comme le Top 1% avec Auto Monday, en recevant les systèmes qui libèrent ton temps. Chaque lundi, dans ta boîte mail."
        }
    ],
    [
        "/newsletter",
        {
            name: "Newsletter",
            title: "Auto Monday",
            description: "Auto Monday est une newsletter qui partage, chaque lundi, une clé pour automatiser comme le Top 1%. Abonne-toi gratuitement."
        }
    ],
    [
        "/consultation",
        {
            name: "Consultation",
            description: "Réserve une consultation 1:1 avec Adrien Bailliard pour automatiser ton business avec des systèmes performants, comme les meilleurs dirigeants."
        }
    ],
    [
        "/le-systeme-d-elite",
        {
            name: "Le Système d'Élite",
            description: "Les protocoles exacts du Top 1% en market making, rassemblés dans un guide gratuit pour créer des systèmes performants."
        }
    ],
    [
        "/a-propos",
        {
            name: "À Propos",
            description: "Fondateur d'Auto Monday, Adrien Bailliard conçoit des systèmes performants qui libèrent ton temps. Découvre son histoire."
        }
    ],
    [
        "/contact",
        {
            name: "Contact",
            description: "Contacte Adrien Bailliard à propos d'automatisation, de systèmes performants et d'opportunités de collaboration."
        }
    ],
    [
        "/conditions-generales",
        {
            name: "Conditions Générales",
            description: "Consulte les conditions générales d'utilisation et la politique de confidentialité du site d'Adrien Bailliard."
        }
    ]
]);


for (const [, value] of pageMapping)
{
    if (!value.title)
        value.title = value.name;
}


export default pageMapping as Map<string, PageMapping>;