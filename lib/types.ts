/**
* @category Newsletter
*/


type NewsletterContent = {
  id: number;
  content: string;
};


export type NewsletterPreviewDB = {
  title: string;
  excerpt: string;
  slug: string;
  updated_at: Date;
  published_at: Date | null;
};

export type NewsletterDB = NewsletterPreviewDB & NewsletterContent;


export type NewsletterPreviewAPI = Omit<NewsletterPreviewDB, "updated_at" | "published_at"> & {
  updated_at: string;
  published_at: string | null;
};

export type NewsletterAPI = NewsletterPreviewAPI & NewsletterContent;


export type InsertNewsletterParam = Pick<NewsletterDB, "content" | "title" | "excerpt">;
export type UpdateNewsletterParam = Partial<NewsletterDB> & Pick<NewsletterDB, "id">;



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