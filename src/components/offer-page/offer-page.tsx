import {useEffect, useMemo, useCallback} from 'react';
import {Navigate, useParams, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import ReviewList from '../review-list/review-list';
import NearPlacesList from '../near-places-list/near-places-list';
import Map from '../map/map';
import Spinner from '../spinner/spinner';
import Header from '../header/header';
import {fetchOffer, fetchNearbyOffers, fetchReviews, toggleFavorite} from '../../store/api-actions';
import {
  selectCurrentOffer,
  selectNearbyOffers,
  selectReviews,
  selectIsOfferLoading,
  selectAuthorizationStatus,
} from '../../store/selectors';
import {AppDispatch} from '../../store';
import {AuthorizationStatus} from '../../types/auth-status';

const MAX_IMAGES_COUNT = 6;
const MAX_NEARBY_COUNT = 3;

const OFFER_TYPE_MAP: Record<string, string> = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

function OfferPage(): JSX.Element {
  const {id} = useParams<{id: string}>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const currentOffer = useSelector(selectCurrentOffer);
  const nearbyOffers = useSelector(selectNearbyOffers);
  const reviews = useSelector(selectReviews);
  const isOfferLoading = useSelector(selectIsOfferLoading);
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviews(id));
    }
  }, [id, dispatch]);

  const nearbySlice = nearbyOffers.slice(0, MAX_NEARBY_COUNT);

  const mapOffers = useMemo(
    () => currentOffer ? [...nearbySlice, currentOffer] : nearbySlice,
    [nearbySlice, currentOffer]
  );

  const handleBookmarkClick = useCallback(() => {
    if (!currentOffer) {
      return;
    }
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }
    dispatch(toggleFavorite({offerId: currentOffer.id, status: currentOffer.isFavorite ? 0 : 1}));
  }, [authorizationStatus, currentOffer, dispatch, navigate]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!currentOffer) {
    return <Navigate to="/not-found" />;
  }

  const {
    title, type, price, rating, isPremium, isFavorite,
    images, bedrooms, maxAdults, goods, host, description, city,
  } = currentOffer;

  const ratingPercent = `${Math.round(rating) / 5 * 100}%`;
  const offerType = OFFER_TYPE_MAP[type] ?? type;
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, MAX_IMAGES_COUNT).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button
                  className={`offer__bookmark-button button${isFavorite ? ' offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleBookmarkClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use href="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: ratingPercent}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offerType}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} {maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li key={good} className="offer__inside-item">{good}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper${host.isPro ? ' offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <ReviewList
                reviews={reviews}
                offerId={currentOffer.id}
                isAuthorized={isAuthorized}
              />
            </div>
          </div>
          <Map city={city} offers={mapOffers} activeOfferId={currentOffer.id} block="offer" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearPlacesList offers={nearbySlice} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
