import site from "@/config/site";
import pageMapping from "@/config/pageMapping";


type BreadcrumbElement = {
  "@type": "ListItem",
  position: number,
  name: string,
  item?: string
};


function getBreadcrumb(pathname: string, index: number, listLength: number): BreadcrumbElement
{
    return {
        "@type": "ListItem",
        position: index + 1,
        name: pageMapping.get(pathname)!.name,
        item: index == listLength - 1 ? undefined : site.url + pathname
    };
}


function getBreadcrumbList(pathname: string): Array<BreadcrumbElement>
{
    const segments = pathname == "/" ? [ "" ] : pathname.split('/');
    const itemList: Array<BreadcrumbElement> = new Array(segments.length);
    let currentPathname = "";

    itemList[0] = getBreadcrumb("/", 0, segments.length);

    for (let i = 1; i < segments.length; i++)
    {
        currentPathname += "/" + segments[i];
        itemList[i] = getBreadcrumb(currentPathname, i, segments.length);
    }

    return itemList;
}


export function getJsonLd(pathname: string): Record<string, unknown>
{
    const pageUrl = site.url + pathname;
    const { title, description } = pageMapping.get(pathname)!;

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": pageUrl,
                "url": pageUrl,
                "name": title,
                "isPartOf": {
                    "@id": site.url + "#website"
                },
                "about": {
                    "@id": site.url + "#organization"
                },
                "description": description,
                "breadcrumb": {
                    "@id": pageUrl + "#breadcrumb"
                },
                "dateModified": new Date().toISOString().replace('Z', '+00:00'),
                "inLanguage": "fr-FR",
                "potentialAction": [
                    {
                        "@type": "ReadAction",
                        "target": [
                            pageUrl
                        ]
                    }
                ]
            },
            {
                "@type": "WebSite",
                "@id": site.url + "#website",
                "url": site.url,
                "name": site.name,
                "description": site.description,
                "publisher": {
                    "@id": site.url + "#organization"
                },
                "inLanguage": "fr-FR"
            },
            {
                "@type": "Organization",
                "@id": site.url + "#organization",
                "name": site.name,
                "url": site.url,
                "logo": {
                    "@type": "ImageObject",
                    "@id": site.url + "#logo",
                    "inLanguage": "fr-FR",
                    "url": site.logo.url,
                    "contentUrl": site.logo.url,
                    "width": site.logo.width,
                    "height": site.logo.height,
                    "caption": site.name
                },
                "image": {
                    "@id": site.url + "#logo"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": pageUrl + "#breadcrumb",
                "itemListElement": getBreadcrumbList(pathname)
            }
        ]
    };
}
