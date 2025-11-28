export type MessageInput = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  category: string;
  message: string;
};


export type GuideStats = {
  totalEmails: number;
  weeklyEmails: number;
  redemmanders: number;
  maxRequests: number;
};


export type SubscriberStats = {
  totalSubscribers: number;
  weeklySubscribers: number;
  unsubscribeRate: number;
};