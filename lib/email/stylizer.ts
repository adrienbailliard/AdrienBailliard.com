import site from "@/config/site";



const styles: Record<string, string> = {
    h3: 'margin-top: 32px; margin-bottom: 20px; color: black; font-size: 24px; font-weight: 500;',
    p: 'margin-top: 12px; margin-bottom: 0; line-height: 24px; color: black; font-size: 16px;',
    li: 'margin: 0; line-height: 24px; color: black; font-size: 16px; list-style: none;',
    ul: 'margin-top: 12px; margin-bottom: 0; margin-left: 12px; padding: 0;',
    a: 'color: #306CE4; font-weight: bold; border-bottom: 1px solid; text-decoration: none; font-size: 16px;'
};

const STYLE_TAGS = Object.keys(styles).join('|');
const tagMatcher = new RegExp(`<(${STYLE_TAGS})`, 'g');



export function stylizeBodyContent(html: string): string
{
    return html.replace(tagMatcher, (match, tagName) => {
        const baseStyle = `${match} style="${styles[tagName]}"`;

        return tagName === 'li'
            ? `${baseStyle}>
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td valign="top"><img src="${site.url}${site.emailAssetsFolder}bullet-point.png" alt="•" style="width: 12px; margin-right: 16px;" /></td>
                        <td`
            : baseStyle;
    }).replace(/<\/li>/g, '</td></tr></table></li>');
}