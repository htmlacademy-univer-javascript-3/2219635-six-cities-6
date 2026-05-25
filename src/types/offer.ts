export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  images: string[];
  description: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};
