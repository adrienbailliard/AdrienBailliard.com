import { KeyedMutator } from 'swr';

import { Selector, supportSelector } from "@/components/messages/Selector";
import { useMessageActions } from '@/context/messageActions';
import { Message } from '@/lib/types';
import { ACTION_TIMEOUT } from "@/lib/constants";

import Dustbin from "@/components/icons/dustbin";
import Read from "@/components/icons/read";
import Unread from "@/components/icons/unread";



type HeaderProps = {
    data: Array<Message> | null;
    mutateMessages: KeyedMutator<Message[]>;
}



export default function Header({ data, mutateMessages }: HeaderProps)
{
    const { selection, selected } = useMessageActions();
    const [ inSelection, setInSelection ] = selection;
    const [ selectedIds, setSelectedIds ] = selected;

    const safeData = data ?? [];


    const selectedMessages = safeData.filter(msg => selectedIds.has(msg.id));
    const isReadAction = !selectedMessages.every(msg => msg.is_read);


    const performOptimisticAction = async (newData: Message[], apiCall: Promise<Response>) => {
        const previousData = [...safeData];
        mutateMessages(newData, { revalidate: false });

        try {
            const response = await apiCall;

            if (!response.ok)
                throw new Error();
        }
        catch {
            mutateMessages(previousData, { revalidate: false });
            mutateMessages();
        }
    };


    const handleDelete = () => {
        const newData = safeData.filter(msg => !selectedIds.has(msg.id));
        const apiCall = fetch(`/api/messages/delete`, {
            method: 'DELETE',
            body: JSON.stringify({ ids: Array.from(selectedIds) }),
            signal: AbortSignal.timeout(ACTION_TIMEOUT)
        });

        performOptimisticAction(newData, apiCall);
        setSelectedIds(new Set());
    };


    const handleReadToggle = async () => {
        const newData = safeData.map(msg => selectedIds.has(msg.id) ? { ...msg, is_read: isReadAction } : msg);
        const apiCall = fetch(`/api/messages/type`, {
            method: 'PATCH',
            body: JSON.stringify({ ids: Array.from(selectedIds), areRead: isReadAction }),
            signal: AbortSignal.timeout(ACTION_TIMEOUT)
        });

        performOptimisticAction(newData, apiCall);
    };


    const toggleSelectionMode = () => {
        setInSelection(!inSelection);
        setSelectedIds(new Set());
    };

    const toggleSelectAll = () =>
        setSelectedIds(selectedIds.size === safeData.length ? new Set() : new Set(safeData.map(msg => msg.id)));


    if (!data)
        return (<h5 className="mb-5">Messages</h5>);

    if (data.length === 0)
        return (<h5>Aucun Message</h5>);


    return (
        <div className={ `flex justify-between h-6 md:h-7.5 mb-5 ${ supportSelector(inSelection) }` }>
            {
                inSelection && selectedIds.size > 0
                ? (
                    <div className={ `flex gap-3 items-center justify-between text-light-fg
                        [&>button]:min-h-10.5 [&>button]:min-w-10.5 *:[&_svg]:h-4.5 *:[&_svg]:m-auto
                    `}>
                        <button
                            onClick={ handleDelete }
                            aria-label="Supprimer les messages"
                        >
                            <Dustbin />
                        </button>
                        <button
                            onClick={ handleReadToggle }
                            aria-label={`Marquer comme ${ isReadAction ? "lu" : "non lu" }`}
                        >
                            { isReadAction ? <Read /> : <Unread /> }
                        </button>
                    </div>
                )
                : <h5>Messages</h5>
            }
            <Selector
                onClick={ toggleSelectAll }
                isSelected={ selectedIds.size === data.length }
                highlightCheckBox={true}
                ariaLabel={ "Tout sélectionner" }
                inSelection={inSelection}
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