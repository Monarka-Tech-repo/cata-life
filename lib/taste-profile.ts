// Ported from d:\CATA\CATA_App\src\components\TasteProfile.js's compute
// functions — pure aggregation logic, unchanged from the mobile app so the
// web Taste Profile matches what a user sees in the app.
import type { Dish } from "@/lib/types";

export const PROFILE_COLORS = [
  "#B8442A", "#EF9F27", "#5A8868", "#7A88A8", "#8A6848", "#A87858", "#6A4858", "#1A3A5C",
];

export type ProfileSegment = {
  key: string;
  count: number;
  pct: number;
  avgRating: number;
  color: string;
};

function allTags(dish: Dish): string[] {
  return [
    ...dish.foodGroupTags,
    ...dish.flavorTags,
    ...dish.aromaTags,
    ...dish.textureTags,
    ...dish.tempTags,
  ];
}

export function computeTasteProfile(items: Dish[], keyField: "category" | "restaurantCuisine"): ProfileSegment[] {
  const counts = new Map<string, number>();
  const ratingSums = new Map<string, number>();
  items.forEach((item) => {
    const key = item[keyField];
    if (!key) return;
    counts.set(key, (counts.get(key) || 0) + 1);
    ratingSums.set(key, (ratingSums.get(key) || 0) + (item.rating || 0));
  });
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  if (!total) return [];
  return [...counts.entries()]
    .map(([key, count]) => ({
      key,
      count,
      pct: (count / total) * 100,
      avgRating: (ratingSums.get(key) || 0) / count,
    }))
    .sort((a, b) => b.count - a.count)
    .map((seg, i) => ({ ...seg, color: PROFILE_COLORS[i % PROFILE_COLORS.length] }));
}

export function topTags(items: Dish[]): string[] {
  const counts = new Map<string, number>();
  items.forEach((item) => {
    allTags(item).forEach((t) => counts.set(t, (counts.get(t) || 0) + 1));
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([tag]) => tag);
}

const MAX_TAG_SEGMENTS = PROFILE_COLORS.length;

export function computeTagProfile(items: Dish[]): ProfileSegment[] {
  const counts = new Map<string, number>();
  const ratingSums = new Map<string, number>();
  items.forEach((item) => {
    allTags(item).forEach((t) => {
      counts.set(t, (counts.get(t) || 0) + 1);
      ratingSums.set(t, (ratingSums.get(t) || 0) + (item.rating || 0));
    });
  });
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  if (!total) return [];

  let entries = [...counts.entries()]
    .map(([key, count]) => ({ key, count, avgRating: (ratingSums.get(key) || 0) / count }))
    .sort((a, b) => b.count - a.count);

  if (entries.length > MAX_TAG_SEGMENTS) {
    const kept = entries.slice(0, MAX_TAG_SEGMENTS - 1);
    const rest = entries.slice(MAX_TAG_SEGMENTS - 1);
    const restCount = rest.reduce((a, e) => a + e.count, 0);
    const restRatingTotal = rest.reduce((a, e) => a + e.avgRating * e.count, 0);
    kept.push({ key: "other", count: restCount, avgRating: restRatingTotal / restCount });
    entries = kept;
  }

  return entries.map((seg, i) => ({
    ...seg,
    pct: (seg.count / total) * 100,
    color: PROFILE_COLORS[i % PROFILE_COLORS.length],
  }));
}

export function computeTagRatingProfile(items: Dish[]): ProfileSegment[] {
  const counts = new Map<string, number>();
  const ratingSums = new Map<string, number>();
  items.forEach((item) => {
    if (!item.rating) return;
    allTags(item).forEach((t) => {
      counts.set(t, (counts.get(t) || 0) + 1);
      ratingSums.set(t, (ratingSums.get(t) || 0) + item.rating);
    });
  });

  let entries = [...counts.entries()]
    .map(([key, count]) => ({ key, count, avgRating: (ratingSums.get(key) || 0) / count }))
    .sort((a, b) => b.avgRating - a.avgRating);

  if (entries.length > MAX_TAG_SEGMENTS) entries = entries.slice(0, MAX_TAG_SEGMENTS);

  const totalAvg = entries.reduce((a, e) => a + e.avgRating, 0);
  if (!totalAvg) return [];
  return entries.map((seg, i) => ({
    ...seg,
    pct: (seg.avgRating / totalAvg) * 100,
    color: PROFILE_COLORS[i % PROFILE_COLORS.length],
  }));
}
