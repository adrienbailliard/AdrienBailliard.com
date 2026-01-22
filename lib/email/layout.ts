import site from "@/config/site";


export default function Layout(children: string): string
{
    return `
        <!DOCTYPE html>
        <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Helvetica, Arial, sans-serif; background-color: #DADADA; color: #FFFFFF;">
            <div style="max-width: 660px; margin: auto;">

              <table style="background-color: #0F0F0F; width: 100%; height: 60px; padding-left: 5%; padding-right: 5%; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <tr>
                  <td style="font-size: 16px; font-weight: 600; padding: 0;">
                    <a href="${site.url}" style="color: #FFFFFF; text-decoration: none; text-transform: uppercase;" target="_blank">${ site.name }</a>
                  </td>
                </tr>
              </table>


              ${children}


              <div style="background-color: #222222; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; padding-top: 48px; padding-bottom: 36px; padding-left: 5%; padding-right: 5%; text-align: center;">
                <a href="${site.url}" style="color: #FFFFFF; text-decoration: none; text-transform: uppercase; font-size: 18px; font-weight: 600;" target="_blank">${ site.name }</a>

                <div style="margin-top: 28px; line-height: 0;">
                  <a target="_blank" href="https://www.linkedin.com/in/adrienbailliard/" style="margin-right: 20px; text-decoration: none;">
                    <img style="padding: 8px;" src="${site.url}${site.emailAssetsFolder}linkedin.png" alt="LinkedIn - ${ site.name }"/>
                  </a>
                  <a target="_blank" href="https://github.com/adrienbailliard">
                    <img style="padding: 8px;" src="${site.url}${site.emailAssetsFolder}github.png" alt="Github - ${ site.name }"/>
                  </a>
                </div>

                <div style="color: #AAAAAA; font-size: 12px; margin-top: 20px;">© ${new Date().getFullYear()} ${ site.name }. Tous droits réservés.</div>
              </div>

            </div>
          </body>
        </html>
    `;
}