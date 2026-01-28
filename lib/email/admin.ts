import { resend } from './client';

import site from "@/config/site";
import authConfig from "@/config/auth";

import layout from "@/lib/email/layout";
import { generateJWT } from "@/lib/security";


const jwtExpirationMinutes = authConfig.tokenExpiration / 60;



export async function sendAdminLoginLink(): Promise<void>
{
    const jwt = await generateJWT({}, authConfig.tokenExpiration);

    const content = `
        <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-top: 64px; padding-bottom: 64px; color: black; font-size: 16px;">
            <p style="color: black; line-height: 24px; margin-top: 0px; font-size: 16px;">
                Hello,
            </p>
            <p style="color: black; margin-top: 24px; line-height: 24px; font-size: 16px;">
                Ceci est ton accès à l'admin :
            <br>
                → <a target="_blank" href="${site.url}/login?${authConfig.cookie.name}=${jwt}" style="color: #306CE4; font-weight: bold; text-underline-offset: 3px; font-size: 16px;">
                    Se connecter
                </a>
            </p>
            <p style="margin-top: 24px; line-height: 24px; color: black; font-size: 16px; margin-bottom: 0px;">
                Ce lien n'est valable que pendant ${jwtExpirationMinutes} minutes.
            </p>
        </div>
    `;


    await resend.emails.send({
        from: process.env.EMAIL_SENDER!,
        to: [process.env.EMAIL_RECEIVER!],
        subject: "[Admin] Ton Lien de Connexion",
        html: layout(content)
    });
}