import { Selector, supportSelector } from "@/components/messages/Selector";
import { useMessageActions } from '@/context/messageActions';

import Dustbin from "@/components/icons/dustbin";
import Read from "@/components/icons/read";
import Unread from "@/components/icons/unread";


type HeaderProps = {
    data: Array<unknown> | undefined;
}


export default function Header({ data }: HeaderProps)
{
    if (!data)
        return (<h5>Messages</h5>);

    if (data.length === 0)
        return (<h5>Aucun Message</h5>);

    const { selection, selectAll, read, remove } = useMessageActions();
    const [ inSelection, setInSelection ] = selection;
    const [ isAllSelected, setIsAllSelected ] = selectAll;
    const [ isReadAction, setReadAction ] = read;
    const [ isRemoveAction, setRemoveAction ] = remove;

    const toggleSelectionMode = () => {
        setInSelection(!inSelection);
        setIsAllSelected(false);
    };


    return (
        <div className={ `flex justify-between h-6 md:h-7.5 ${ supportSelector(inSelection) }` }>
            {
                inSelection
                ? (
                    <div className={ `flex gap-3 items-center justify-between text-light-fg text-xs
                        [&>button]:min-h-10.5 [&>button]:min-w-10.5 *:[&_svg]:h-4.5 *:[&_svg]:m-auto
                    `}>
                        <button onClick={ () => setRemoveAction(isRemoveAction + 1) }>
                            <Dustbin />
                        </button>
                        <button onClick={ () => setReadAction(!isReadAction) }>
                            { isReadAction ? <Read /> : <Unread /> }
                        </button>
                    </div>
                )
                : <h5>Messages</h5>
            }
            <Selector
                setIsSelected={setIsAllSelected}
                isSelected={isAllSelected}
                className="border-light-fg"
            />
            <button
                className='text-primary font-medium'
                onClick={ toggleSelectionMode }
            >
                { inSelection ? "Annuler" : "Sélectionner" }
            </button>
        </div>
    );
}