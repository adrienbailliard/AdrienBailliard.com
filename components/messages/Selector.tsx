import Check from "@/components/icons/check";


type MessageSelectorProps = {
    isSelected: boolean;
    inSelection: boolean;
    onClick?: () => void;
    highlightCheckBox?: boolean;
    ariaLabel: string; 
}


export function supportSelector(inSelection: boolean)
{
    return `duration-300 relative ${ inSelection && "ml-10" }`;
}


export function Selector({ isSelected, onClick, inSelection, highlightCheckBox, ariaLabel }: MessageSelectorProps)
{
    return (
        <button
            onClick={ onClick }
            aria-label={ ariaLabel }
            aria-pressed={ isSelected }
            className={ `duration-300 cursor-pointer w-12 h-12 group absolute top-1/2 -translate-y-1/2
                ${ inSelection
                    ? "opacity-100 visible -left-13.75"
                    : "opacity-0 invisible -left-23.75"
                }
            ` }
        >
            <div className={ `h-4.5 w-4.5 bg-transparent border m-auto group-[:hover,:active]:border-light-fg
                    ${ highlightCheckBox ? "border-light-fg" : "border-dark-muted-text" }
                    ${ inSelection && isSelected && "border-light-fg" }
                `}
            />
            {
                isSelected && <Check
                    className='w-3 absolute left-4.5 top-1/2 -translate-y-1/2'
                    aria-hidden="true"
                />
            }
        </button>
    );
}