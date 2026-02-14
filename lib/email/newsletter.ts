import { resend } from './client';

import { remark } from 'remark';
import html from 'remark-html';

import layout from "@/lib/email/layout";
import { stylizeBodyContent } from "@/lib/email/stylizer";

import authConfig from "@/config/auth";
import newsletterConfig from "@/config/newsletter";
import site from "@/config/site";

import { Newsletter } from "@/lib/types";
import { NEWSLETTER_ROUTE } from "@/lib/constants";
import { generateJWT } from "@/lib/security";



export async function sendConfirmation(email: string): Promise<void>
{
    const content = stylizeBodyContent(`
        <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-top: 36px; padding-bottom: 64px;">
            <p>
                Hello,
            </p>
            <p>
                Il est temps de franchir un cap et de libérer ton temps grâce à l'automatisation.
            </p>
            <p>
                Pour cela, tu dois comprendre les clés des systèmes du Top 1%.
            </p>
            <h3>
                LE GAIN
            </h3>
            <p>
                Tous les lundis, un système pour automatiser <em>intelligemment</em>.
            </p>
            <p>
                Je ne partage que ce qui a une réelle valeur.
            </p>
            <h3>
                LA PRÉPARATION
            </h3>
            <p>
                Pour être sûr de recevoir mes emails :
            </p>
            <ul>
                <li>
                    Réponds « merci » à ce mail.
                </li>
                <li>
                    Si ce mail a atterri dans ton dossier Spam ou Promotions, déplace-le dans ta boîte de réception principale.
                </li>
            </ul>
            <p>_</p>
            <p>
                À très vite !
                <br />
                ${ site.name }
            </p>
            <p>
                PS : En attendant la prochaine newsletter, tu peux <a href="${site.url}/consultation">réserver une consultation 1:1</a> pour libérer ton temps grâce à des systèmes sur mesure.
            </p>
        </div>
    `);


    await resend.emails.send({
        from: process.env.EMAIL_SENDER!,
        to: [email],
        replyTo: process.env.EMAIL_RECEIVER!,
        subject: "Bienvenue dans Auto Monday",
        html: layout(content, true)
    });
}



export async function sendEdition(emails: Array<string>, newsletter: Newsletter): Promise<void>
{
    const subject = newsletterConfig.slogan + newsletter.title;
    const markdownProcessed = await remark()
        .use(html)
        .process(newsletter.content);

    const content = `
        <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-top: 48px; padding-bottom: 64px;">
            <a href="${site.url}${NEWSLETTER_ROUTE}/${newsletter.slug}" style="text-decoration: none; color: #306CE4; font-weight: 600; font-size: 16px;">
                Lis en Ligne<img style="margin-left: 16px; width: 8px;" src="${site.url}${site.emailAssetsFolder}right-chevron.png"/>
            </a>

            <h1 style="font-weight: 400; font-size: 32px; margin-top: 64px; margin-bottom: 48px; color: black; text-align: center;">
                ${subject}
            </h1>

            ${ stylizeBodyContent(markdownProcessed.toString()) }
        </div>
    `;


    const promises = emails.map(async (email) => {
        const jwt = await generateJWT({ email });
        const unsubscribeUrl = `${site.url}/preferences?${authConfig.cookie.name}=${jwt}`;

        return {
            from: process.env.EMAIL_SENDER!,
            to: [email],
            replyTo: process.env.EMAIL_RECEIVER!,
            subject,
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