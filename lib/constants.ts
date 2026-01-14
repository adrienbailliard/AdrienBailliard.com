export enum domainStatus {
  INVALID = 0,
  VALID = 1
}

export enum newsletterStatus {
  DRAFT = 0,
  SCHEDULED = 1,
  PUBLISHED = 2
};

export const EMAIL_PATTERN = String.raw`[a-zA-Z0-9._%+\-]{1,64}@[a-zA-Z0-9.\-]{1,255}\.[a-zA-Z]{2,}$`;
export const DOMAIN_CACHE_TTL_DAYS = 30;
export const MAX_FECTH_EMAIL_RETRY = 10;
export const FECTH_EMAIL_DELAY = 6000;
export const STATS_PERCENTAGE_PRECISION = 1;
export const DRAFT_CREATION_SLUG = 'creer';