"use client";
import useSWR from 'swr';

import { useAuth } from '@/context/authentification';
import { MessageActionsProvider } from '@/context/messageActions';
import { useMessageActions } from '@/context/messageActions';
import { Message } from '@/lib/types';

import MessageCard from "@/components/messages/MessageCard";
import Selector from "@/components/messages/Selector";
import MessageSkeletonCard from "@/components/messages/SkeletonCard";
import Dustbin from "@/components/icons/dustbin";
import Read from "@/components/icons/read";
import Unread from "@/components/icons/unread";


const fetcher = (url: string) =>
    fetch(url).then(r => r.json());

const supportSelector = (inSelectionMode: boolean) =>
    `duration-300 relative ${ inSelectionMode && "pl-10" }`;

type HeaderProps = {
    data: Array<unknown> | undefined;
}



function Header({ data }: HeaderProps)
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
                    <div className={ `flex gap-3 items-center justify-between text-light-muted-text text-xs
                        [&>button]:[:hover,:active]:text-light-fg [&>button]:min-h-10.5 [&>button]:min-w-10.5 *:[&_svg]:w-5.5 *:[&_svg]:m-auto
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



export default function LastMessages()
{
    const { isAdmin } = useAuth();

    if (!isAdmin)
        return null;

    const { data } = useSWR<Message[]>(`/api/messages`, fetcher);
    const now = new Date();


    return (
        <section className="text-light-fg bg-dark-bg pb-0">
            <div>
                <MessageActionsProvider>
                    <Header data={data}/>
                    <div className='divide-y divide-dark-muted-text pt-5'>
                        {
                            data
                            ? data.map((message, i) => <MessageCard message={message} now={now} key={i}/>)
                            : [...Array(3)].map((_, i) => <MessageSkeletonCard key={i}/>)
                        }
                    </div>
                </MessageActionsProvider>
            </div>
        </section>
    );
}