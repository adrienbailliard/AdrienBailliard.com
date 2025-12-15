/**
* @category Newsletter
*/

export type NewsletterSlug = {
  slug: string;
};


type BaseNewsletter = NewsletterSlug & {
  title: string;
  excerpt: string;
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


type BaseContentNewsletter = BaseNewsletter & {
  id: number;
  content: string;
  updated_at: Date;
}


export type DraftNewsletterDB = BaseContentNewsletter & {
  published_at: null;
};


export type PublishedNewsletterDB = BaseContentNewsletter & {
  published_at: Date;
};



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