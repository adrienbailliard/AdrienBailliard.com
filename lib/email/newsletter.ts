import { resend } from './client';
import Layout from "@/lib/email/layout";
import site from "@/config/site";


export async function sendConfirmation(email: string): Promise<void>
{
    const content = `
        <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-top: 48px; padding-bottom: 64px; text-align: center;">
            <a target="_blank" href="${site.url}/newsletter/"><img src="${site.url}${site.emailAssetsFolder}auto-monday.png" alt="Auto Monday - Logo" style="width: 100%; border-radius: 6px;"/></a>
        </div>

        <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-bottom: 64px; color: black; font-size: 16px;">
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
                À très vite !
                <br />
                Adrien Bailliard
            </p>
            <p style="margin-top: 24px; line-height: 24px; color: black; font-size: 16px;">
                PS : En attendant la prochaine newsletter, tu peux <a target="_blank" href="${site.url}/consultation/" style="color: #306CE4; font-weight: bold; text-underline-offset: 3px; font-size: 16px;">réserver une consultation 1:1</a> pour libérer ton temps grâce à des systèmes sur mesure.
            </p>
        </div>
    `;


    await resend.emails.send({
        from: process.env.EMAIL_SENDER!,
        to: [email],
        replyTo: process.env.EMAIL_RECEIVER!,
        subject: "Bienvenue dans Auto Monday",
        html: Layout(content)
    });
}