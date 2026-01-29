export enum NewsletterStatus {
  Draft = "DRAFT",
  Scheduled = "SCHEDULED",
  Published = "PUBLISHED"
}


export const EMAIL_PATTERN = String.raw`[a-zA-Z0-9._%+\-]{1,64}@[a-zA-Z0-9.\-]{1,255}\.[a-zA-Z]{2,}$`;

export const DOMAIN_CACHE_TTL_DAYS = 30;
export const STATS_PERCENTAGE_PRECISION = 1;

export const DRAFT_CREATION_SLUG = 'creer';
export const ERROR_MESSAGE = "Réessaie l'Envoi";
export const PENDING_MESSAGE = "Envoi...";

export const LOGIN_ROUTE = "/connexion";