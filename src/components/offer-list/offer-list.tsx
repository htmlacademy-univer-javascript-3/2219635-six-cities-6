import {useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offer';

type OfferListProps = {
  offers: Offer[];
};

function OfferList({offers}: OfferListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          block="cities"
          isActive={offer.id === activeOfferId}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
        />
      ))}
    </div>
  );
}

export default OfferList;
