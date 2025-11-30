export enum emailStatus {
  INVALID = 0,
  VALID = 1
}

export const EMAIL_PATTERN = String.raw`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`;
export const DOMAIN_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
export const MAX_FECTH_EMAIL_RETRY = 10;
export const FECTH_EMAIL_DELAY = 6000;
export const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
export const STATS_REVALIDATE = 120;
export const STATS_PERCENTAGE_PRECISION = 1;