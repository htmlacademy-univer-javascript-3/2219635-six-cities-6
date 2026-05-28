import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import LoginPage from './login-page';
import {rootReducer} from '../../store/root-reducer';
import {AuthorizationStatus} from '../../types/auth-status';
import {NameSpace} from '../../types/namespace';

const makeStore = (authorizationStatus: AuthorizationStatus) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: {
      [NameSpace.App]: {city: 'Paris', isOffersLoading: false, isOfferLoading: false},
      [NameSpace.Data]: {offers: [], favoriteOffers: [], currentOffer: null, nearbyOffers: [], reviews: []},
      [NameSpace.User]: {authorizationStatus, userData: null},
    },
  });

describe('LoginPage', () => {
  it('should render login form when user is not authorized', () => {
    render(
      <Provider store={makeStore(AuthorizationStatus.NoAuth)}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('heading', {name: /sign in/i})).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(
      <Provider store={makeStore(AuthorizationStatus.NoAuth)}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('button', {name: /sign in/i})).toBeInTheDocument();
  });
});
