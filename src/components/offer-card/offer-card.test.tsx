import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import OfferCard from './offer-card';
import {rootReducer} from '../../store/root-reducer';
import {AuthorizationStatus} from '../../types/auth-status';
import {NameSpace} from '../../types/namespace';
import {makeMockOffer} from '../../utils/mock';

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    preloadedState: {
      [NameSpace.App]: {city: 'Paris', isOffersLoading: false, isOfferLoading: false},
      [NameSpace.Data]: {offers: [], favoriteOffers: [], currentOffer: null, nearbyOffers: [], reviews: []},
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth, userData: null},
    },
  });

const renderOfferCard = (offer = makeMockOffer(), block: 'cities' | 'favorites' | 'near-places' = 'cities') =>
  render(
    <Provider store={makeStore()}>
      <MemoryRouter>
        <OfferCard offer={offer} block={block} />
      </MemoryRouter>
    </Provider>
  );

describe('OfferCard', () => {
  it('should render offer title', () => {
    const offer = makeMockOffer();
    renderOfferCard(offer);
    expect(screen.getAllByText(offer.title).length).toBeGreaterThan(0);
  });

  it('should render offer price', () => {
    const offer = {...makeMockOffer(), price: 150};
    const {container} = renderOfferCard(offer);
    expect(container.querySelector('.place-card__price-value')).toHaveTextContent('150');
  });

  it('should render offer type', () => {
    const offer = {...makeMockOffer(), type: 'apartment'};
    renderOfferCard(offer);
    expect(screen.getByText('apartment')).toBeInTheDocument();
  });

  it('should render Premium badge when isPremium is true', () => {
    const offer = {...makeMockOffer(), isPremium: true};
    renderOfferCard(offer);
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render Premium badge when isPremium is false', () => {
    const offer = {...makeMockOffer(), isPremium: false};
    renderOfferCard(offer);
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render bookmark button as active when isFavorite is true', () => {
    const offer = {...makeMockOffer(), isFavorite: true};
    const {container} = renderOfferCard(offer);
    const btn = container.querySelector('.place-card__bookmark-button');
    expect(btn).toHaveClass('place-card__bookmark-button--active');
  });

  it('should not render bookmark button as active when isFavorite is false', () => {
    const offer = {...makeMockOffer(), isFavorite: false};
    const {container} = renderOfferCard(offer);
    const btn = container.querySelector('.place-card__bookmark-button');
    expect(btn).not.toHaveClass('place-card__bookmark-button--active');
  });
});
