import { resend } from './client';
import { MessageInput } from "@/lib/types";
import layout from "@/lib/email/layout";
import site from "@/config/site";


export async function sendMessage({ firstName, lastName, email, company, category, content }: MessageInput): Promise<void>
{
  const html = `
    <div style="background-color: #0F0F0F; text-align: center; padding-bottom: 64px; padding-left: 5%; padding-right: 5%; padding-top: 45px;">
      <img src="${ site.url }${ site.emailAssetsFolder }plane.png" alt="Message qui s'envoie">
      <h1 style="font-weight: 400; font-size: 32px; margin-top: 28px; margin-bottom: 0; color: white;">
        Un message vient d'être envoyé
      </h1>
    </div>


    <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-top: 64px; padding-bottom: 64px;">
      <div style="background-color: #0F0F0F; border-radius: 6px; padding: 28px;">
        <h2 style="font-weight: 400; font-size: 20px; margin-top: 0px; margin-bottom: 20px; color: white;">
          Coordonnées
        </h2>

        <div style="font-size: 16px; color: #AAAAAA;">Nom</div>
        <div style="font-size: 16px; color: white; margin-top: 8px; word-break: break-word;">${ firstName } ${ lastName }</div>

        <div style="font-size: 16px; color: #AAAAAA; margin-top: 24px;">Entreprise</div>
        <div style="font-size: 16px; color: white; margin-top: 8px; word-break: break-word;">${ company }</div>

        <div style="font-size: 16px; color: #AAAAAA; margin-top: 24px;">Email</div>
        <div style="font-size: 16px; color: white; margin-top: 8px; word-break: break-word;">${ email }</div>
      </div>

      <div style="background-color: #0F0F0F; border-radius: 6px; padding: 28px; margin-top: 28px;">
        <h2 style="font-weight: 400; font-size: 20px; margin-top: 0px; margin-bottom: 20px; color: white;">
          Demande
        </h2>

        <div style="font-size: 16px; color: #AAAAAA;">Catégorie</div>
        <div style="font-size: 16px; color: white; margin-top: 8px; word-break: break-word;">${ category }</div>

        <div style="font-size: 16px; color: #AAAAAA; margin-top: 24px;">Message</div>
        <div style="font-size: 16px; color: white; margin-top: 8px; word-break: break-word;">${ content.replace(/\n/g, '<br>') }</div>
      </div>
    </div>
  `;


  await resend.emails.send({
    from: process.env.EMAIL_SENDER!,
    to: [process.env.EMAIL_RECEIVER!],
    replyTo: email,
    subject: `Nouveau Message - ${firstName} ${lastName}`,
    html: layout(html)
  });
}