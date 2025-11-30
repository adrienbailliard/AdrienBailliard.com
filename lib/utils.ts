export function formatPercentage(value: number): string
{
    return `${ value == 0 || value == 100 ? Math.floor(value) : value }%`;
}


export function adaptLabel(value: number, labels: { singular: string, plural: string }): string
{
    return value > 1 ? labels.plural : labels.singular;
}