import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import OfferCard from '../offer-card/offer-card';
import Header from '../header/header';
import {fetchFavorites} from '../../store/api-actions';
import {selectFavoriteOffers} from '../../store/selectors';
import {AppDispatch} from '../../store';

function FavoritesPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteOffers = useSelector(selectFavoriteOffers);
  const cities = [...new Set(favoriteOffers.map((offer) => offer.city.name))];

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className={`page${favoriteOffers.length === 0 ? ' page--favorites-empty' : ''}`}>
      <Header />

      <main className={`page__main page__main--favorites${favoriteOffers.length === 0 ? ' page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {favoriteOffers.length === 0 ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h2 className="favorites__title">Saved listing</h2>
              <ul className="favorites__list">
                {cities.map((city) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to="/">
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favoriteOffers
                        .filter((offer) => offer.city.name === city)
                        .map((offer) => (
                          <OfferCard key={offer.id} offer={offer} block="favorites" />
                        ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>

      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
