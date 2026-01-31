import site from "@/config/site";
import pages from "@/config/navigation";

import { Page } from "@/lib/types";



const ENTITY_WEBSITE = {
    "@type": "WebSite",
    "@id": `${site.url}#website`,
    "url": site.url,
    "name": site.name,
    "description": site.description,
    "publisher": { "@id": `${site.url}#organization` },
    "inLanguage": "fr-FR"
};


const ENTITY_ORG = {
    "@type": "Organization",
    "@id": `${site.url}#organization`,
    "name": site.name,
    "url": site.url,
    "logo": {
        "@type": "ImageObject",
        "url": site.logo.url,
        "width": site.logo.width,
        "height": site.logo.height
    }
};



type BreadcrumbElement = {
  "@type": "ListItem",
  position: number,
  name: string,
  item?: string
};



function getBreadcrumb(pathname: string, nameFallback: string, index: number, listLength: number): BreadcrumbElement
{
    return {
        "@type": "ListItem",
        position: index + 1,
        name: pages.get(pathname) || nameFallback,
        item: index == listLength - 1 ? undefined : site.url + pathname
    };
}



function getBreadcrumbList(pathname: string, nameFallback: string): Array<BreadcrumbElement>
{
    const segments = pathname == "/" ? [ "" ] : pathname.split('/');
    const itemList: Array<BreadcrumbElement> = new Array(segments.length);
    let currentPathname = "";


    itemList[0] = getBreadcrumb("/", nameFallback, 0, segments.length);

    for (let i = 1; i < segments.length; i++)
    {
        currentPathname += "/" + segments[i];
        itemList[i] = getBreadcrumb(currentPathname, nameFallback, i, segments.length);
    }
    

    return itemList;
}



export function getJsonLd({ pathname, title, description, publishedAt }: Page): Record<string, unknown>
{
    const pageUrl = site.url + pathname;
    const publishedAtISO = publishedAt instanceof Date ? publishedAt.toISOString() : publishedAt;


    const graph: Array<Record<string, any>> = [
        {
            "@type": "WebPage",
            "@id": pageUrl,
            "url": pageUrl,
            "name": title,
            "description": description,
            "isPartOf": { "@id": ENTITY_WEBSITE["@id"] },
            "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
            "datePublished": publishedAtISO,
            "dateModified": publishedAtISO,
            "inLanguage": "fr-FR"
        },
        ENTITY_WEBSITE,
        ENTITY_ORG,
        {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            "itemListElement": getBreadcrumbList(pathname, title)
        }
    ];


    if (publishedAtISO)
    {
        graph.push({
            "@type": "NewsArticle",
            "@id": `${pageUrl}#article`,
            "isPartOf": { "@id": pageUrl },
            "mainEntityOfPage": { "@id": pageUrl },
            "headline": title,
            "description": description,
            "datePublished": publishedAtISO,
            "dateModified": publishedAtISO,
            "image": site.logo.url,
            "author": {
                "@type": "Person",
                "name": site.name,
                "url": site.url
            },
            "publisher": { "@id": ENTITY_ORG["@id"] }
        });
    }


    return {
        "@context": "https://schema.org",
        "@graph": graph
    };
}