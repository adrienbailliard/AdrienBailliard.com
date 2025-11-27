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

              <table style="background-color: #0F0F0F; width: 100%; padding: 19px; padding-left: 5%; padding-right: 5%; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <tr>
                  <td style="font-size: 16px; font-weight: 500; padding: 0;">
                    <a href="${site.url}" style="color: #FFFFFF; text-decoration: none; text-transform: uppercase;" target="_blank">${ site.name }</a>
                  </td>
                </tr>
              </table>


              ${children}


              <div style="background-color: #222222; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; padding-top: 13px; padding-bottom: 18px; padding-left: 5%; padding-right: 5%;">
                <table style="width: 100%; text-align: center;">
                  <tr>
                    <td style="padding: 0; padding-bottom: 14px;">
                      <a target="_blank" href="https://www.linkedin.com/in/adrienbailliard/" style="display: inline-block; padding: 11px;">
                        <img src="${site.url}${site.emailAssetsFolder}linkedin.png" alt="LinkedIn - ${ site.name }"/>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0; color: #ADADAD; font-size: 12px;">
                      © ${new Date().getFullYear()} ${ site.name }
                    </td>
                  </tr>
                </table>
              </div>

            </div>
          </body>
        </html>
    `;
}