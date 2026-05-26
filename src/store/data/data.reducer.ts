import {createReducer} from '@reduxjs/toolkit';
import {fetchOffers, fetchOffer, fetchNearbyOffers, fetchReviews, submitReview, fetchFavorites, toggleFavorite} from '../api-actions';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';

type DataState = {
  offers: Offer[];
  favoriteOffers: Offer[];
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
};

const initialState: DataState = {
  offers: [],
  favoriteOffers: [],
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
};

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(fetchOffer.pending, (state) => {
      state.currentOffer = null;
    })
    .addCase(fetchOffer.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(submitReview.fulfilled, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(toggleFavorite.fulfilled, (state, action) => {
      const updatedOffer = action.payload;
      const offerIndex = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
      if (offerIndex !== -1) {
        state.offers[offerIndex] = updatedOffer;
      }
      if (state.currentOffer?.id === updatedOffer.id) {
        state.currentOffer = updatedOffer;
      }
      if (updatedOffer.isFavorite) {
        const alreadyInFavorites = state.favoriteOffers.some((offer) => offer.id === updatedOffer.id);
        if (!alreadyInFavorites) {
          state.favoriteOffers.push(updatedOffer);
        }
      } else {
        state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== updatedOffer.id);
      }
    });
});
