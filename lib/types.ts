/**
* @category Newsletter
*/

export type BaseNewsletter = {
  title: string;
  excerpt: string;
  slug: string;
};


export type PublishedNewsletterPreviewDB = BaseNewsletter & {
  published_at: Date;
};


export type NewsletterDraftPreviewDB = BaseNewsletter & {
  updated_at: Date;
};


export type NewsletterDraftPreviewAPI = BaseNewsletter & {
  updated_at: string;
};


export type NewsletterDB = BaseNewsletter & {
  id: number;
  content: string;
  updated_at: Date;
  published_at: Date | null;
};


export type UpsertNewsletterParam = Partial<NewsletterDB> & Pick<NewsletterDB, "content" | "title" | "excerpt">;


/**
* @category Message
*/

export type MessageInput = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  category: string;
  content: string;
};


export type Message = MessageInput & {
  first_name: string;
  last_name: string;
  created_at: string;
  is_read: boolean;
  id: number;
};



/**
* @category Statistics
*/

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