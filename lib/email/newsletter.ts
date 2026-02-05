import { resend } from './client';

import { remark } from 'remark';
import html from 'remark-html';

import layout from "@/lib/email/layout";
import { generateJWT } from "@/lib/security";

import authConfig from "@/config/auth";
import newsletterConfig from "@/config/newsletter";
import site from "@/config/site";

import { Newsletter } from "@/lib/types";
import { NEWSLETTER_ROUTE } from "@/lib/constants";



const styles: Record<string, string> = {
    h3: 'margin-top: 32px; margin-bottom: 20px; color: black; font-size: 24px; font-weight: 500;',
    p: 'margin-top: 12px; margin-bottom: 0; line-height: 24px; color: black; font-size: 16px;',
    li: 'margin-top: 0; margin-bottom: 0; line-height: 24px; color: black; font-size: 16px; list-style: none;',
    ul: 'margin-top: 12px; margin-bottom: 0; margin-left: 12px; padding: 0;'
};

const STYLE_TAGS = Object.keys(styles).join('|');
const tagMatcher = new RegExp(`<(${STYLE_TAGS})`, 'g');



export async function sendConfirmation(email: string): Promise<void>
{
    const content = `
        <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-bottom: 64px;">
            <p style="color: black; margin-bottom: 16px; margin-top: 0px; font-size: 16px;">
                Hello,
            </p>
            <p style="color: black; line-height: 24px; font-size: 16px;">
                Il est temps de franchir un cap et de libérer ton potentiel grâce à l'automatisation.
            </p>
            <p style="margin-top: 16px; line-height: 24px; color: black; font-size: 16px;">
                Pour cela, tu dois comprendre les clés des systèmes du Top 1%.
            </p>
            <p style="margin-top: 24px; line-height: 24px; color: black; font-weight: bold; font-size: 16px;">
                Ce que tu recevras
            </p>
            <p style="margin-top: 16px; line-height: 24px; color: black; font-size: 16px;">
                Tous les lundis, un petit mail avec un conseil applicable pour automatiser intelligemment.
            </p>
            <p style="margin-top: 16px; line-height: 24px; color: black; font-size: 16px;">
                Je ne partage que ce qui a une réelle valeur.
            </p>
            <p style="margin-top: 24px; line-height: 24px; color: black; font-weight: bold; font-size: 16px;">
                Pour être sûr de recevoir mes emails
            </p>
            <ul style="margin-top: 16px; color: black; padding-left: 5%; font-size: 16px;">
                <li style="font-weight: bold; line-height: 24px; font-size: 16px;">
                    Réponds « merci » à ce mail.
                </li>
                <li style="line-height: 24px; margin-top: 8px; font-size: 16px;">
                    Si ce mail a atterri dans ton dossier Spam ou Promotions, <span style="font-weight: bold;">déplace-le dans ta boîte de réception principale.</span>
                </li>
            </ul>
            <p style="margin-top: 24px; margin-bottom: 0px; color: black; line-height: 24px; font-size: 16px;">
                À très vite !
                <br />
                ${ site.name }
            </p>
            <p style="margin-top: 24px; line-height: 24px; color: black; font-size: 16px; margin-bottom: 0px;">
                PS : En attendant la prochaine newsletter, tu peux <a target="_blank" href="${site.url}/consultation" style="color: #306CE4; font-weight: bold; text-underline-offset: 3px; font-size: 16px;">réserver une consultation 1:1</a> pour libérer ton temps grâce à des systèmes sur mesure.
            </p>
        </div>
    `;


    await resend.emails.send({
        from: process.env.EMAIL_SENDER!,
        to: [email],
        replyTo: process.env.EMAIL_RECEIVER!,
        subject: "Bienvenue dans Auto Monday",
        html: layout(content, true)
    });
}



async function getNewsletterHtml(newsletter: Newsletter): Promise<string>
{
    let newsletterHtml = (await remark()
        .use(html)
        .process(newsletter.content)).toString();

    return newsletterHtml.replace(tagMatcher, (match, tagName) => {
        const baseStyle = `${match} style="${styles[tagName]}"`;

        return tagName === 'li'
            ? `${baseStyle}><img src="${site.url}${site.emailAssetsFolder}bullet-point.png" alt="•" style="width: 12px; margin-right: 16px;" /`
            : baseStyle;
    });
}



export async function sendEdition(emails: Array<string>, newsletter: Newsletter): Promise<void>
{
    const newsletterContent = await getNewsletterHtml(newsletter);

    const content = `
        <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-bottom: 64px;">
            <a target="_blank" href="${site.url}${NEWSLETTER_ROUTE}/${newsletter.slug}" style="text-decoration: none; color: #306CE4; font-weight: 600; font-size: 16px;">
                Lis en Ligne<img style="margin-left: 16px; width: 8px;" src="${site.url}${site.emailAssetsFolder}right-chevron.png"/>
            </a>

            <h1 style="font-weight: 400; font-size: 32px; margin-top: 64px; margin-bottom: 48px; color: black; text-align: center;">
                ${newsletterConfig.slogan}${newsletter.title}
            </h1>

            ${ newsletterContent }
        </div>
    `;


    const promises = emails.map(async (email) => {
        const jwt = await generateJWT({ email });
        const unsubscribeUrl = `${site.url}/preferences?${authConfig.cookie.name}=${jwt}`;

        return {
            from: process.env.EMAIL_SENDER!,
            to: [email],
            replyTo: process.env.EMAIL_RECEIVER!,
            subject: newsletterConfig.slogan + newsletter.title,
            html: layout(content, true, unsubscribeUrl),
            headers: {
                'List-Unsubscribe': `<${site.url}/api/newsletter/unsubscribe?${authConfig.cookie.name}=${jwt}>`,
                'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
            }
        };
    });


    const payload = await Promise.all(promises);
    await resend.batch.send(payload);
}