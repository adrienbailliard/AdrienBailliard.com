import Check from "@/components/icons/check";
import { useMessageActions } from '@/context/messageActions';


type MessageSelectorProps = {
    isSelected: boolean;
    setIsSelected: (value: boolean) => void;
}


export function supportSelector(inSelectionMode: boolean)
{
    return `duration-300 relative ${ inSelectionMode && "pl-10" }`;
}


export function Selector({ isSelected, setIsSelected }: MessageSelectorProps)
{
    const { selection } = useMessageActions();
    const [ inSelection ] = selection;

    return (
        <button
            className={ `duration-300 cursor-pointer w-12 h-12 group
                absolute top-1/2 -translate-y-1/2 ${ inSelection
                    ? "opacity-100 visible -left-3.75"
                    : "opacity-0 invisible -left-13.75" }
            ` }
            onClick={ () => setIsSelected(!isSelected) }
        >
            <div className={ `h-4.5 w-4.5 bg-transparent border border-dark-muted-text m-auto
                    group-[:hover,:active]:border-light-fg
                    ${ inSelection && isSelected && "border-light-fg" }
                `}
            />
            { isSelected && <Check className='w-3 absolute left-4.5 top-1/2 -translate-y-1/2'/> }
        </button>
    );
}