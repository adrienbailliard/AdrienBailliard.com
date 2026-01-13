/**
* @category SEO
*/


export type BasePage = {
  pathname: string;
  title: string;
  description: string;
};


export type StaticPage = BasePage & {
  publishedAt?: never
};


export type ArticlePage = BasePage & {
  publishedAt: Date | null
};


export type Page = StaticPage | ArticlePage;



/**
* @category Newsletter
*/


type NewsletterContent = {
  id: number;
  content: string;
};


export type NewsletterSlug = {
  slug: string;
};


export type NewsletterPreview = NewsletterSlug & {
  title: string;
  excerpt: string;
  updated_at: Date;
  published_at: Date | null;
};

export type Newsletter = NewsletterPreview & NewsletterContent;


export type SerializedNewsletterPreview = Omit<NewsletterPreview, "updated_at" | "published_at"> & {
  updated_at: string;
  published_at: string | null;
};


export type InsertNewsletterParam = Pick<Newsletter, "content" | "title" | "excerpt">;
export type UpdateNewsletterParam = Partial<InsertNewsletterParam> & Pick<Newsletter, "id">;
export type EditorNewsletterParam = InsertNewsletterParam & Partial<Pick<Newsletter, "id" | "slug">>;



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