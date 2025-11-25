import { resend } from './client';
import { MessageInput } from "@/lib/types";
import Layout from "@/lib/email/layout";
import site from "@/config/site";


export async function sendMessage({ firstName, lastName, email, company, category, message }: MessageInput): Promise<void>
{
  const content = `
    <div style="background-color: #0F0F0F; text-align: center; padding-bottom: 64px; padding-left: 5%; padding-right: 5%; padding-top: 45px;">
      <img src="${site.url}${site.emailAssetsFolder}plane.png" alt="Message qui s'envoie">
      <h1 style="font-weight: 400; font-size: 32px; margin-top: 28px; margin-bottom: 0; color: white;">
        Un message vient d'être envoyé
      </h1>
    </div>


    <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-top: 64px; padding-bottom: 64px;">
      <div style="background-color: #0F0F0F; border-radius: 6px; padding: 24px;">
        <h2 style="font-weight: 400; font-size: 20px; margin-top: 0px; margin-bottom: 20px; color: white;">
          Coordonnées
        </h2>
        <table style="width: 100%; word-break: break-word;">
          <tr style="vertical-align: top;">
            <td style="font-size: 16px; color: #ADADAD; padding: 0;" width="35%">
              Prénom
            </td>
            <td style="font-size: 16px; padding: 0; padding-left: 8px; color: white;" width="65%">
              ${firstName}
            </td>
          </tr>
          <tr style="vertical-align: top;">
            <td style="font-size: 16px; color: #ADADAD; padding: 0; padding-top: 10px;" width="35%">
              Nom
            </td>
            <td style="font-size: 16px; padding: 0; padding-top: 10px; padding-left: 8px; color: white;" width="65%">
              ${lastName}
            </td>
          </tr>
          <tr style="vertical-align: top;">
            <td style="font-size: 16px; color: #ADADAD; padding: 0; padding-top: 10px;" width="35%">
              Email
            </td>
            <td style="font-size: 16px; padding: 0; padding-top: 10px; padding-left: 8px; text-decoration: none; color: white;" width="65%">
              ${email}
            </td>
          </tr>
          <tr style="vertical-align: top;">
            <td style="font-size: 16px; color: #ADADAD; padding: 0; padding-top: 10px;" width="35%">
              Entreprise
            </td>
            <td style="font-size: 16px; padding: 0; padding-top: 10px; padding-left: 8px; color: white;" width="65%">
              ${company}
            </td>
          </tr>
        </table>
      </div>

      <div style="background-color: #0F0F0F; border-radius: 6px; padding: 24px; margin-top: 32px;">
        <h2 style="font-weight: 400; font-size: 20px; margin-top: 0px; margin-bottom: 20px; color: white;">
          Demande
        </h2>
        <table style="width: 100%; word-break: break-word;">
          <tr style="vertical-align: top;">
            <td style="font-size: 16px; color: #ADADAD; padding: 0;" width="35%">
              Catégorie
            </td>
            <td style="font-size: 16px; padding: 0; padding-left: 8px; color: white;" width="65%">
              ${category}
            </td>
          </tr>
          <tr style="vertical-align: top;">
            <td style="font-size: 16px; color: #ADADAD; padding: 0; padding-top: 10px;" width="35%">
              Message
            </td>
            <td style="font-size: 16px; padding: 0; padding-top: 10px; padding-left: 8px; color: white;" width="65%">
              ${message}
            </td>
          </tr>
        </table>
      </div>
    </div>
  `;


  await resend.emails.send({
    from: process.env.EMAIL_SENDER!,
    to: [process.env.EMAIL_RECEIVER!],
    replyTo: email,
    subject: `Nouveau Message - ${firstName} ${lastName}`,
    html: Layout(content)
  });
}