import { resend } from './client';
import layout from "@/lib/email/layout";
import site from "@/config/site";


export async function sendGuide(email: string): Promise<void>
{
    const content = `
      <table cellspacing="0" cellpadding="0" style="background-color: #0F0F0F; text-align: center; width: 100%;
        background-image: url('${site.url}${site.emailAssetsFolder}le-systeme-d-elite.png'); background-repeat: no-repeat; background-position: center center; background-size: 224px 317px; height: 445px;"
      >
        <tr>
          <td></td>
        </tr>
        <tr style="background-image: url('${site.url}${site.emailAssetsFolder}guide-gradient.png'); background-size: 660px 71px;">
          <td height="71px" style="font-size: 32px; padding: 0; padding-left: 5%; padding-right: 5%; vertical-align: bottom; color: white;">
            Le Système d'Élite
          </td>
        </tr>
        <tr align="center" style="background: black;">
          <td height="132px" style="font-size: 16px; padding: 0; padding-left: 5%; padding-right: 5%;">
            <p style="max-width: 330px; margin-bottom: 64px; margin-top: 32px; color: white;">
              Les protocoles exacts derrière les systèmes performants du Top 1%.
            </p>
          </td>
        </tr>
      </table>


      <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-top: 64px; padding-bottom: 64px;">
        <p style="color: black; line-height: 24px; margin-top: 0px; font-size: 16px;">
          Hello,
        </p>
        <p style="color: black; margin-top: 24px; line-height: 24px; font-size: 16px;">
          Comme convenu, voici ton accès au guide :
          <br>
          → <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ" style="color: #306CE4; font-weight: bold; text-underline-offset: 3px; font-size: 16px;">Télécharger le PDF</a>
        </p>
        <p style="margin-top: 24px; line-height: 24px; color: black; font-size: 16px;">
          Découvre comment automatiser pour gagner en performance.
        </p>
        <p style="margin-top: 24px; line-height: 24px; margin-bottom: 0px; color: black; font-size: 16px;">
          ${ site.name }
        </p>
      </div>
    `;


    await resend.emails.send({
        from: process.env.EMAIL_SENDER!,
        to: [email],
        replyTo: process.env.EMAIL_RECEIVER!,
        subject: "[Les Protocoles du Top 1%] Ton Guide Est Prêt",
        html: layout(content)
    });
}