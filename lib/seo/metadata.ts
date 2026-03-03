import type { Metadata } from "next";

import site from "@/config/site";
import { Page } from "@/lib/types";



function getIconsMetadata(): Metadata
{
    return {
        icons: {
            apple: [
                { url: site.faviconsFolder + "apple-touch-icon.png", sizes: "180x180" }
            ],
            icon: [
                { url: site.faviconsFolder + "favicon.svg", type: "image/svg+xml" },
                { url: site.faviconsFolder + "favicon-96x96.png", type: "image/png", sizes: "96x96" }
            ]
        },
        manifest: site.faviconsFolder + "site.webmanifest",
        appleWebApp: {
            title: site.name
        }
    };
}



export function getUtilityMetadata(title: string): Metadata
{
    return {
      title: title,
      robots: 'noindex',
      ...getIconsMetadata()
    };
}



export function getMetadata({ pathname, title, description, publishedAt }: Page): Metadata
{
    const htmlTitle = pathname == "/" ? title : title + " - " + site.name;
    const publishedAtISO = publishedAt instanceof Date ? publishedAt.toISOString() : publishedAt;


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
            ...(publishedAtISO && {
                type: 'article',
                publishedTime: publishedAtISO,
                modifiedTime: publishedAtISO
            })
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