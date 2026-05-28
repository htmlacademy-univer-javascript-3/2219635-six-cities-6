import {describe, it, expect} from 'vitest';
import {appReducer} from './app.reducer';
import {changeCity} from '../action';
import {fetchOffers, fetchOffer} from '../api-actions';
import {makeMockOffer} from '../../utils/mock';

describe('appReducer', () => {
  const initialState = {
    city: 'Paris',
    isOffersLoading: false,
    isOfferLoading: false,
  };

  it('should return initial state with unknown action', () => {
    expect(appReducer(undefined, {type: 'UNKNOWN'})).toEqual(initialState);
  });

  it('should update city on changeCity', () => {
    const result = appReducer(initialState, changeCity('Amsterdam'));
    expect(result.city).toBe('Amsterdam');
  });

  it('should set isOffersLoading to true on fetchOffers.pending', () => {
    const result = appReducer(initialState, fetchOffers.pending('', undefined));
    expect(result.isOffersLoading).toBe(true);
  });

  it('should set isOffersLoading to false on fetchOffers.fulfilled', () => {
    const state = {...initialState, isOffersLoading: true};
    const result = appReducer(state, fetchOffers.fulfilled([], '', undefined));
    expect(result.isOffersLoading).toBe(false);
  });

  it('should set isOffersLoading to false on fetchOffers.rejected', () => {
    const state = {...initialState, isOffersLoading: true};
    const result = appReducer(state, fetchOffers.rejected(null, '', undefined));
    expect(result.isOffersLoading).toBe(false);
  });

  it('should set isOfferLoading to true on fetchOffer.pending', () => {
    const result = appReducer(initialState, fetchOffer.pending('', ''));
    expect(result.isOfferLoading).toBe(true);
  });

  it('should set isOfferLoading to false on fetchOffer.fulfilled', () => {
    const state = {...initialState, isOfferLoading: true};
    const mockOffer = makeMockOffer();
    const result = appReducer(state, fetchOffer.fulfilled(mockOffer, '', ''));
    expect(result.isOfferLoading).toBe(false);
  });

  it('should set isOfferLoading to false on fetchOffer.rejected', () => {
    const state = {...initialState, isOfferLoading: true};
    const result = appReducer(state, fetchOffer.rejected(null, '', ''));
    expect(result.isOfferLoading).toBe(false);
  });
});
