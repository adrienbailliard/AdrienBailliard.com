export type MessageInput = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  category: string;
  message: string;
};


export type StatResponse = {
  value: number | string;
  label: string;
};


export type GuideStats = {
  total_emails: number;
  weekly_emails: number;
  retries: number;
  max_requests: number;
};


export type SubscriberStats = {
  total_subscribers: number;
  weekly_subscribers: number;
  unsubscribe_rate: number;
};