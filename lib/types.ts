export type MessageInput = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  category: string;
  content: string;
};


export type NewsletterDraft = {
  slug: string;
  title: string;
  excerpt: string;
  updated_at: Date;
};


export type Message = MessageInput & {
  first_name: string;
  last_name: string;
  created_at: string;
  is_read: boolean;
  id: number;
};


export type StatResponse = {
  value: number | string;
  label: string;
};


export type GuideStats = {
  total_contacts: number;
  weekly_contacts: number;
  retries_rate: number;
};


export type MessagesStats = {
  total_messages: number;
  weekly_messages: number;
  contacts: number;
};


export type SubscribersStats = {
  total_subscribers: number;
  weekly_subscribers: number;
  unsubscribe_rate: number;
};