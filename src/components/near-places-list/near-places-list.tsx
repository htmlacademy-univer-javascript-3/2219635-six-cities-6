import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offer';

type NearPlacesListProps = {
  offers: Offer[];
};

function NearPlacesList({offers}: NearPlacesListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} block="near-places" />
      ))}
    </div>
  );
}

export default NearPlacesList;
