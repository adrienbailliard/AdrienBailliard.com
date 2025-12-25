import { Message } from '@/lib/types';
import { KeyedMutator } from 'swr';



async function performOptimisticAction(data: Message[], mutate: KeyedMutator<Message[]>, apiCall: Promise<Response>)
{
    const action = async () => {
        const response = await apiCall;

        if (!response.ok)
            throw new Error();

        return data;
    };

    return mutate(action(), {
        optimisticData: data,
        rollbackOnError: true,
        revalidate: false
    }).catch(() => mutate());
};



export function deleteMessages(data: Message[], ids: Set<number>, mutate: KeyedMutator<Message[]>)
{
    const newData = data.filter(msg => !ids.has(msg.id));
    const idArray = Array.from(ids);

    const apiCall = fetch(`/api/messages/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ ids: idArray })
    });

    performOptimisticAction(newData, mutate, apiCall);
}



export function toggleReadStatus(data: Message[], ids: Set<number>, isRead: boolean, mutate: KeyedMutator<Message[]>)
{
    const idArray = Array.from(ids);
    const newData = data.map(msg =>
        ids.has(msg.id) ? { ...msg, is_read: isRead } : msg);

    const apiCall = fetch(`/api/messages/type`, {
        method: 'PATCH',
        body: JSON.stringify({ ids: idArray, areRead: isRead })
    });

    performOptimisticAction(newData, mutate, apiCall);
}