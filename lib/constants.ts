export enum emailStatus {
  INVALID = 0,
  VALID = 1
}

export const EMAIL_PATTERN = String.raw`[a-zA-Z0-9._%+\-]{1,64}@[a-zA-Z0-9.\-]{1,255}\.[a-zA-Z]{2,}$`;
export const DOMAIN_CACHE_TTL_DAYS = 30;
export const MAX_FECTH_EMAIL_RETRY = 10;
export const FECTH_EMAIL_DELAY = 6000;
export const DATA_REVALIDATE = 60;
export const STATS_PERCENTAGE_PRECISION = 1;