import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';

type OfferCardProps = {
  offer: Offer;
  block: 'cities' | 'favorites' | 'near-places';
  isActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function OfferCard({offer, block, isActive, onMouseEnter, onMouseLeave}: OfferCardProps): JSX.Element {
  const {id, title, type, price, rating, isPremium, isFavorite, previewImage} = offer;
  const imageWidth = block === 'favorites' ? 150 : 260;
  const imageHeight = block === 'favorites' ? 110 : 200;

  return (
    <article
      className={`${block}__card place-card${isActive ? ' place-card--active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button${isFavorite ? ' place-card__bookmark-button--active' : ''} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(rating) / 5 * 100}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
