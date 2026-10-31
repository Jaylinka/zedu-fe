/**
 * Store ratings shown on the marketing site (footer and home hero).
 *
 * There is no API to fetch these at build time, so they are copied by hand from the store
 * pages. Update `lastChecked` whenever you change a number.
 * - App Store: https://itunes.apple.com/lookup?id=6759181591&country=ng
 *   (`averageUserRating` and `userRatingCount`)
 * - Google Play: the store page itself; there is no official API.
 *
 * `sourceUrl` is where the numbers were read. The store links people click still come from
 * `storeLink()` in `~/lib/env-urls`.
 */
export type StoreKey = "app" | "play";

export type StoreRating = {
  /** The store's official name. */
  name: string;
  /** Average rating, as the store shows it. */
  rating: string;
  count: number;
  /** What the store calls a rating: "rating" on the App Store, "review" on Google Play. */
  countLabel: string;
  /** Date the numbers were last compared with the store page (YYYY-MM-DD). */
  lastChecked: string;
  sourceUrl: string;
};

export const storeRatings: Record<StoreKey, StoreRating> = {
  app: {
    name: "App Store",
    rating: "5.0",
    count: 1,
    countLabel: "rating",
    lastChecked: "2026-10-31",
    sourceUrl: "https://apps.apple.com/ng/app/zedu-app/id6759181591",
  },
  play: {
    name: "Google Play",
    rating: "4.9",
    count: 11,
    countLabel: "review",
    lastChecked: "2026-10-31",
    sourceUrl: "https://play.google.com/store/apps/details?id=net.emerj.zedu",
  },
};

/** "4.9 · 11 reviews" or "5.0 · 1 rating". */
export function ratingSummary({
  rating,
  count,
  countLabel,
}: StoreRating): string {
  return `${rating} · ${count} ${countLabel}${count === 1 ? "" : "s"}`;
}
