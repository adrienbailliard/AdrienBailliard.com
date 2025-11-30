export function formatPercentage(value: number): string
{
    return `${value == 0 ? 0 : value}%`;
}


export function adaptLabel(value: number, labels: { singular: string, plural: string }): string
{
    return value > 1 ? labels.plural : labels.singular;
}