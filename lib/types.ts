// Shared Firestore document shapes — mirrors the schema written by the
// CATA mobile app (d:\CATA\CATA_App) so web and app stay data-compatible.

export type CataUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  bio: string;
  dishCount: number;
  followersCount: number;
  followingCount: number;
  tier: "free" | "pro";
  setupComplete: boolean;
  createdAt: unknown;
  updatedAt: unknown;
};

export type Dish = {
  id: string;
  userId: string;
  name: string;
  category: string | null;
  restaurantCuisine: string | null;
  restaurantName: string | null;
  rating: number;
  notes: string;
  photoURL: string | null;
  foodGroupTags: string[];
  flavorTags: string[];
  aromaTags: string[];
  textureTags: string[];
  tempTags: string[];
  createdAt: unknown;
};

export type RestaurantEntry = {
  placeId: string;
  name: string;
  photo: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  recommendedDishes: unknown[];
};

export type FoodJourneyList = {
  id: string;
  userId: string;
  userName: string | null;
  userPhoto: string | null;
  title: string;
  city: string;
  lat: number | null;
  lng: number | null;
  restaurants: RestaurantEntry[];
  memberIds: string[];
  members: unknown[];
  public: boolean;
  createdAt: unknown;
};
