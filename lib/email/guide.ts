import { resend } from './client';
import site from "@/config/site";

import layout from "@/lib/email/layout";
import { stylizeBodyContent } from "@/lib/email/stylizer";



const staticHtml = layout(`
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #0F0F0F; text-align: center; width: 100%;
    background-image: url('${site.url}${site.illustrationsFolder}le-systeme-d-elite.png'); background-repeat: no-repeat; background-position: center bottom; background-size: 224px 317px; height: 381px;"
  >
    <tr><td></td></tr>
    <tr style="background-image: url('${site.url}${site.emailAssetsFolder}guide-gradient.png'); background-size: 660px 68px;">
      <td height="68px" style="font-size: 32px; padding-left: 5%; padding-right: 5%; vertical-align: bottom; color: white;">
        Les Secrets du Top 1%
      </td>
    </tr>
    <tr style="background: black;">
      <td height="64px"></td>
    </tr>
  </table>


  ${ stylizeBodyContent(`
    <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-top: 52px; padding-bottom: 64px;">
      <p>
        Hello,
      </p>
      <p>
        Comme convenu, voici ton accès au guide :
        <br>
        → <a href="${site.url}${site.documentsFolder}Le%20Syst%C3%A8me%20d'%C3%89lite%20-%20Adrien%20Bailliard.pdf">Télécharger le PDF</a>
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
`);



export async function sendGuide(email: string): Promise<void>
{
    await resend.emails.send({
        from: process.env.EMAIL_SENDER!,
        to: [email],
        replyTo: process.env.EMAIL_RECEIVER!,
        subject: "[Le Système d'Élite] Ton Guide Est Prêt",
        html: staticHtml
    });
}