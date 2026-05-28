import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import App from './app';
import {rootReducer} from '../../store/root-reducer';
import {AuthorizationStatus} from '../../types/auth-status';
import {NameSpace} from '../../types/namespace';

vi.mock('../main-page/main-page', () => ({default: () => <div>Main Page</div>}));
vi.mock('../login-page/login-page', () => ({default: () => <div>Login Page</div>}));
vi.mock('../favorites-page/favorites-page', () => ({default: () => <div>Favorites Page</div>}));
vi.mock('../offer-page/offer-page', () => ({default: () => <div>Offer Page</div>}));

const makeStore = (authorizationStatus = AuthorizationStatus.Auth) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: {
      [NameSpace.App]: {city: 'Paris', isOffersLoading: false, isOfferLoading: false},
      [NameSpace.Data]: {offers: [], favoriteOffers: [], currentOffer: null, nearbyOffers: [], reviews: []},
      [NameSpace.User]: {authorizationStatus, userData: null},
    },
  });

describe('App routing', () => {
  it('should render main page at "/"', () => {
    window.history.pushState({}, '', '/');
    render(<Provider store={makeStore()}><App /></Provider>);
    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });

  it('should render login page at "/login"', () => {
    window.history.pushState({}, '', '/login');
    render(<Provider store={makeStore()}><App /></Provider>);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('should render favorites page at "/favorites" when authorized', () => {
    window.history.pushState({}, '', '/favorites');
    render(<Provider store={makeStore(AuthorizationStatus.Auth)}><App /></Provider>);
    expect(screen.getByText('Favorites Page')).toBeInTheDocument();
  });

  it('should redirect to login at "/favorites" when not authorized', () => {
    window.history.pushState({}, '', '/favorites');
    render(<Provider store={makeStore(AuthorizationStatus.NoAuth)}><App /></Provider>);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('should render offer page at "/offer/:id"', () => {
    window.history.pushState({}, '', '/offer/abc123');
    render(<Provider store={makeStore()}><App /></Provider>);
    expect(screen.getByText('Offer Page')).toBeInTheDocument();
  });

  it('should render not found page at unknown route', () => {
    window.history.pushState({}, '', '/this-route-does-not-exist');
    render(<Provider store={makeStore()}><App /></Provider>);
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
