import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offer';

type OfferListProps = {
  offers: Offer[];
  activeOfferId: string | null;
  onOfferHover: (id: string | null) => void;
};

function OfferList({offers, activeOfferId, onOfferHover}: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          block="cities"
          isActive={offer.id === activeOfferId}
          onMouseEnter={() => onOfferHover(offer.id)}
          onMouseLeave={() => onOfferHover(null)}
        />
      ))}
    </div>
  );
}

export default OfferList;
