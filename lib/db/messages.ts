import { unstable_cache } from 'next/cache';

import { sql } from '@/lib/db/client';
import { MessagesStats, StatResponse, MessageInput, Message } from '@/lib/types';
import { adaptLabel, formatGain } from '@/lib/utils';



export async function insertMessage({ firstName, lastName, email, company, category, content }: MessageInput): Promise<void>
{
    await sql `
        INSERT INTO messages (first_name, last_name, email, company, category, content)
        VALUES (${firstName}, ${lastName}, ${email}, ${company}, ${category}, ${content})
    `;
}


export const getMessages = unstable_cache(
  async (): Promise<Message[]> => {
    const result = await sql `
      SELECT *
      FROM messages
      ORDER BY created_at DESC
    ` as Message[];

    return result;
  },
  ['messages'],
  { tags: ['messages'] }
);



export async function deleteMessages(ids: Array<number>): Promise<void>
{
  await sql`
    DELETE FROM messages
    WHERE id = ANY(${ids});
  `;
}



export async function updateMessagesReadStatus(ids: Array<number>, areRead: boolean): Promise<void>
{
  await sql`
    UPDATE messages
    SET is_read = ${areRead}
    WHERE id = ANY(${ids});
  `;
}



export const getMessagesStats = unstable_cache(
  async (): Promise<Array<StatResponse>> => {
    const result = await sql `
      SELECT 
        COUNT(*) as total_messages,
        COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '7 days') as weekly_messages,
        COUNT(DISTINCT email) as contacts
      FROM messages
    ` as MessagesStats[];

    const stats = result[0];

    return [
      { value: stats.total_messages, label:
        adaptLabel(stats.total_messages, { singular: 'Message total', plural: 'Messages totaux' })
      },
      { value: formatGain(stats.weekly_messages), label: 
        adaptLabel(stats.weekly_messages, {singular: 'Message cette semaine', plural: 'Messages cette semaine' })
      },
      { value: stats.contacts, label:
        adaptLabel(stats.contacts, {singular: 'Contact', plural: 'Contacts' })
      }
    ];
  },
  ['messages-stats'],
  { tags: ['messages-stats'] }
);