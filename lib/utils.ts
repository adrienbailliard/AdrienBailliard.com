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



export function formatAdminDate(value: string, isScheduled: boolean = false): string
{
    const now = new Date();
    const date = new Date(value);

    if (isScheduled && now > date)
        return "prêt";

    const timestampDiff = new Date(date).setHours(0) - now.setHours(0);
    const daysDiff = Math.round(timestampDiff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0)
        return date.toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    if (daysDiff == 1) return 'demain';
    if (daysDiff == -1) return 'hier';

    if (Math.abs(daysDiff) <= 6)
        return date.toLocaleString('fr-FR', { weekday: 'long' });

    return date.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}



export function formatPublicDate(value: string | Date): string
{
    const date = typeof value === "string" ? new Date(value) : value;

    return date.toLocaleDateString('fr-FR', {
        timeZone: 'Europe/Paris',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}



export function generateSlug(title: string): string {
    return title
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}