import { emailStatus } from "@/lib/constants";


export type MessageInput = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  category: string;
  message: string;
};


export type DomainData = {
  domain: string;
  status: emailStatus;
  checked_at: Date;
}


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