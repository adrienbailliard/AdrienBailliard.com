import site from "@/config/site";
import { NEWSLETTER_ROUTE } from "@/lib/constants";



export default function layout(children: string, showNewsletterHeader?: boolean, unsubscribeUrl?: string): string
{
    return `
        <!DOCTYPE html>
        <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <style>
              @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

              p,
              figcaption,
              ul {
                font-family: 'Nunito', system-ui, Arial;
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0;">
            <div style="max-width: 660px; margin: auto; font-family: 'Plus Jakarta Sans', system-ui, Arial;">

              <table border="0" cellpadding="0" cellspacing="0" style="background-color: #0F0F0F; width: 100%; height: 60px; padding-left: 5%; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <tr>
                  <td style="font-size: 16px; font-weight: 600;">
                    <a href="${site.url}" style="color: #FFFFFF; text-decoration: none; text-transform: uppercase;" target="_blank">${ site.name }</a>
                  </td>
                </tr>
              </table>


              ${showNewsletterHeader ? `
                <div style="background-color: #F0F0F0; padding-left: 5%; padding-right: 5%; padding-top: 64px; font-size: 0;">
                  <a target="_blank" href="${site.url}${NEWSLETTER_ROUTE}">
                      <img src="${site.url}${site.emailAssetsFolder}auto-monday.png" alt="Auto Monday" style="width: 100%; border-radius: 6px;"/>
                  </a>
                </div>
              ` : ""}


              ${children}


              <div style="background-color: #222222; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; padding-top: 48px; padding-bottom: 36px; padding-left: 5%; padding-right: 5%; text-align: center;">
                <a href="${site.url}" style="color: #FFFFFF; text-decoration: none; text-transform: uppercase; font-size: 18px; font-weight: 600;" target="_blank">${ site.name }</a>

                <div style="margin-top: 28px; margin-bottom: 20px; font-size: 0;">
                  <a target="_blank" href="https://www.linkedin.com/in/adrienbailliard/" style="margin-right: 20px; text-decoration: none;">
                    <img style="padding: 8px; width: 26px;" src="${site.url}${site.emailAssetsFolder}linkedin-icon.png" alt="LinkedIn - ${ site.name }"/>
                  </a>
                  <a target="_blank" href="https://github.com/adrienbailliard">
                    <img style="padding: 8px; width: 26px;" src="${site.url}${site.emailAssetsFolder}github-icon.png" alt="Github - ${ site.name }"/>
                  </a>
                </div>

                ${unsubscribeUrl ? `
                  <div style="margin-bottom: 16px; font-size: 12px; font-weight: 500;">
                    <a href="${unsubscribeUrl}" style="color: #FFFFFF; text-decoration: none;" target="_blank">Se désabonner</a>
                  </div>
                ` : ""}

                <div style="color: #AAAAAA; font-size: 12px;">© ${new Date().getFullYear()} ${ site.name }. Tous droits réservés.</div>
              </div>

            </div>
          </body>
        </html>
    `;
}