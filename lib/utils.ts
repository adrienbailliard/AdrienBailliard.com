export function formatPercentage(value: number): string
{
    if (value === null)
        return "0%";

    return `${ value == 0 || value == 100 ? Math.floor(value) : value }%`;
}


export function adaptLabel(value: number, labels: { singular: string, plural: string }): string
{
    return value > 1 ? labels.plural : labels.singular;
}


export function formatGain(value: number): string
{
    return value > 0 ? `+${value}` : value.toString();
}


export function formatAdminDate(value: string, now: Date): string
{
    const date = new Date(value);
    const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (!daysDiff)
        return date.toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    if (daysDiff == 1)
        return 'hier';

    if (daysDiff <= 6)
        return date.toLocaleString('fr-FR', { weekday: 'long' });

    return date.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}


export function formatPublicDate(value: Date): string
{
    return value.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}


export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}