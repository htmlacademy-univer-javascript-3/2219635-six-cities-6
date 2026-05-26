import {memo, useCallback} from 'react';
import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offer';

type OfferListProps = {
  offers: Offer[];
  activeOfferId: string | null;
  onOfferHover: (id: string | null) => void;
};

type OfferCardItemProps = {
  offer: Offer;
  activeOfferId: string | null;
  onOfferHover: (id: string | null) => void;
};

function OfferCardItem({offer, activeOfferId, onOfferHover}: OfferCardItemProps): JSX.Element {
  const handleMouseEnter = useCallback(() => onOfferHover(offer.id), [offer.id, onOfferHover]);
  const handleMouseLeave = useCallback(() => onOfferHover(null), [onOfferHover]);

  return (
    <OfferCard
      offer={offer}
      block="cities"
      isActive={offer.id === activeOfferId}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}

const MemoizedOfferCardItem = memo(OfferCardItem);

function OfferList({offers, activeOfferId, onOfferHover}: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <MemoizedOfferCardItem
          key={offer.id}
          offer={offer}
          activeOfferId={activeOfferId}
          onOfferHover={onOfferHover}
        />
      ))}
    </div>
  );
}

export default OfferList;
