import type { Metadata } from "next";

import site from "@/config/site";
import pageMapping from "@/config/pageMapping";


export function getIconsMetadata(): Metadata
{
    return {
        icons: [
            {
                rel: "icon",
                type: "image/png",
                sizes: "96x96",
                url: site.faviconsFolder + "favicon-96x96.png",
            },
            {
                rel: "icon",
                type: "image/svg+xml",
                url: site.faviconsFolder + "favicon.svg",
            },
            {
                rel: "shortcut icon",
                url: site.faviconsFolder + "favicon.ico",
            },
            {
                rel: "apple-touch-icon",
                sizes: "180x180",
                url: site.faviconsFolder + "apple-touch-icon.png",
            },
        ],
        manifest: site.faviconsFolder + "site.webmanifest",
        other: {
            "apple-mobile-web-app-title": site.name
        }
    };
}


export function getMetadata(pathname: string): Metadata
{
    const { title, description } = pageMapping.get(pathname)!;
    const htmlTitle = pathname == "/" ? title : title + " - " + site.name;

    return {
        title: htmlTitle,
        description: description,
        metadataBase: new URL(site.url),
        alternates: {
            canonical: pathname
        },
        ...getIconsMetadata(),
        robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        openGraph: {
            siteName: site.name,
            title: title,
            description: description,
            images: [
                {
                    url: site.logo.url,
                    width: site.logo.width,
                    height: site.logo.height,
                    alt: 'Logo d\'' + site.name
                },
            ],
            locale: 'fr_FR',
            type: 'website',
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [
                {
                    url: site.logo.url,
                    alt: 'Logo d\'' + site.name,
                },
            ]
        }
    };
};