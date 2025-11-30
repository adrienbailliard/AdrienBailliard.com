import { sql } from '@/lib/db/client';
import { MessagesStats, StatResponse, MessageInput } from '@/lib/types';
import { adaptLabel, formatGain } from '@/lib/utils';


export async function insertMessage({ firstName, lastName, email, company, category, message }: MessageInput): Promise<void>
{
    await sql `
        INSERT INTO messages (first_name, last_name, email, company, category, message)
        VALUES (${firstName}, ${lastName}, ${email}, ${company}, ${category}, ${message})
    `;
}


export async function getMessagesStats(): Promise<Array<StatResponse>>
{
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
      adaptLabel(stats.total_messages, { singular: 'Total de message', plural: 'Total de messages' })
    },
    { value: formatGain(stats.weekly_messages), label: 
      adaptLabel(stats.weekly_messages, {singular: 'Message cette semaine', plural: 'Messages cette semaine' })
    },
    { value: stats.contacts, label:
      adaptLabel(stats.contacts, {singular: 'Contact', plural: 'Contacts' })
    }
  ];
}