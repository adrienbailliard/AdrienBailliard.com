import { resend } from './client';
import site from "@/config/site";

import layout from "@/lib/email/layout";
import { stylizeBodyContent } from "@/lib/email/stylizer";



export async function sendGuide(email: string): Promise<void>
{
    const content = `
      <table border="0" cellpadding="0" cellspacing="0" style="background-color: #0F0F0F; text-align: center; width: 100%;
        background-image: url('${site.url}${site.emailAssetsFolder}le-systeme-d-elite.png'); background-repeat: no-repeat; background-position: center center; background-size: 224px 317px; height: 445px;"
      >
        <tr>
          <td></td>
        </tr>
        <tr style="background-image: url('${site.url}${site.emailAssetsFolder}guide-gradient.png'); background-size: 660px 71px;">
          <td height="71px" style="font-size: 32px; padding-left: 5%; padding-right: 5%; vertical-align: bottom; color: white;">
            Les Secrets du Top 1%
          </td>
        </tr>
        <tr align="center" style="background: black;">
          <td height="132px" style="font-size: 16px; padding-left: 5%; padding-right: 5%;">
            <p style="max-width: 330px; margin-bottom: 64px; margin-top: 32px; color: white;">
              Un système d'élite se construit méthodiquement.
            </p>
          </td>
        </tr>
      </table>


      ${ stylizeBodyContent(`
        <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-top: 52px; padding-bottom: 64px;">
          <p>
            Hello,
          </p>
          <p>
            Comme convenu, voici ton accès au guide :
            <br>
            → <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ">Télécharger le PDF</a>
          </p>
          <p>
            Découvre comment automatiser au-delà de la <em>performance</em>.
          </p>
          <p>_</p>
          <p>
            ${ site.name }
          </p>
        </div>
      `) }
    `;


    await resend.emails.send({
        from: process.env.EMAIL_SENDER!,
        to: [email],
        replyTo: process.env.EMAIL_RECEIVER!,
        subject: "[Le Système d'Élite] Ton Guide Est Prêt",
        html: layout(content)
    });
}