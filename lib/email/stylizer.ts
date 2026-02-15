import site from "@/config/site";



const styles = {
    h3: 'margin-top: 32px; margin-bottom: 20px; color: black; font-size: 24px; font-weight: 500;',
    p: 'margin-top: 12px; margin-bottom: 0; line-height: 24px; color: black; font-size: 16px;',
    ul: 'margin-top: 12px; margin-bottom: 0; margin-left: 12px; padding: 0;',
    a: 'color: #306CE4; font-weight: bold; border-bottom: 1px solid; text-decoration: none; font-size: 16px;'
};


const tags = Object.keys(styles).join('|');
const tagMatcher = new RegExp(`<(${tags})(?=[\\s>])`, 'g');



export function stylizeBodyContent(html: string): string
{
    const stylized = html.replace(tagMatcher, (match, tagName: keyof typeof styles) => `${match} style="${styles[tagName]}"`);
    
    return stylized.replace(/<li>([\s\S]*?)<\/li>/g, (_, content) => {
        const contentWithStrong = content.replace(/<strong/g, `<strong style="font-weight: 600;"`);

        return `
            <li style="margin: 0; line-height: 24px; color: black; font-size: 16px; list-style: none;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                        <td valign="top">
                            <img src="${site.url}${site.emailAssetsFolder}bullet-point.png" alt="•" style="display: block; width: 12px; margin-right: 16px; padding-top: 6px;" />
                        </td>
                        <td>
                            ${contentWithStrong}
                        </td>
                    </tr>
                </table>
            </li>
        `; 
    });
}