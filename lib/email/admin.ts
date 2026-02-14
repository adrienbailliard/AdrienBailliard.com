import { resend } from './client';

import site from "@/config/site";
import authConfig from "@/config/auth";

import { LOGIN_ROUTE } from "@/lib/constants";
import { generateJWT } from "@/lib/security";

import layout from "@/lib/email/layout";
import { stylizeBodyContent } from "@/lib/email/stylizer";


const jwtExpirationMinutes = authConfig.tokenExpiration / 60;



export async function sendAdminLoginLink(): Promise<void>
{
    const jwt = await generateJWT({}, authConfig.tokenExpiration);

    const content = stylizeBodyContent(`
        <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-top: 52px; padding-bottom: 64px;">
            <p>
                Hello,
            </p>
            <p>
                Ceci est ton accès à l'admin :
            <br>
                → <a href="${site.url}${LOGIN_ROUTE}?${authConfig.cookie.name}=${jwt}">
                    Se connecter
                </a>
            </p>
            <p>
                Ce lien n'est valable que pendant <strong>${jwtExpirationMinutes} minutes</strong>.
            </p>
        </div>
    `);


    await resend.emails.send({
        from: process.env.EMAIL_SENDER!,
        to: [process.env.EMAIL_RECEIVER!],
        subject: "[Admin] Ton Lien de Connexion",
        html: layout(content)
    });
}