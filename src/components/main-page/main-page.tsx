import {useMemo, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import CityList from '../city-list/city-list';
import SortingOptions, {SortType} from '../sorting-options/sorting-options';
import Spinner from '../spinner/spinner';
import MainEmpty from '../main-empty/main-empty';
import Header from '../header/header';
import {changeCity} from '../../store/action';
import {
  selectCity,
  selectIsOffersLoading,
  selectCityOffers,
} from '../../store/selectors';
import {CITY_NAMES, getCityByName} from '../../mocks/cities';
import {Offer} from '../../types/offer';
import {AppDispatch} from '../../store';

function getSortedOffers(offers: Offer[], sort: SortType): Offer[] {
  switch (sort) {
    case 'Price: low to high':
      return [...offers].sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return [...offers].sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}

function MainPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const activeCity = useSelector(selectCity);
  const cityOffers = useSelector(selectCityOffers);
  const isOffersLoading = useSelector(selectIsOffersLoading);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<SortType>('Popular');

  const sortedOffers = useMemo(
    () => getSortedOffers(cityOffers, activeSort),
    [cityOffers, activeSort]
  );

  const cityData = useMemo(() => getCityByName(activeCity), [activeCity]);

  const handleCityChange = useCallback((city: string) => {
    dispatch(changeCity(city));
    setActiveSort('Popular');
  }, [dispatch]);

  const handleOfferHover = useCallback((id: string | null) => {
    setActiveOfferId(id);
  }, []);

  if (isOffersLoading) {
    return <Spinner />;
  }

  const isEmpty = cityOffers.length === 0;

  return (
    <div className="page page--gray page--main">
      <Header isActiveMain />

      <main className={`page__main page__main--index${isEmpty ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList cities={CITY_NAMES} activeCity={activeCity} onCityChange={handleCityChange} />
          </section>
        </div>
        <div className="cities">
          {isEmpty ? (
            <MainEmpty city={activeCity} />
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortedOffers.length} places to stay in {activeCity}</b>
                <SortingOptions activeSort={activeSort} onSortChange={setActiveSort} />
                <OfferList
                  offers={sortedOffers}
                  activeOfferId={activeOfferId}
                  onOfferHover={handleOfferHover}
                />
              </section>
              <div className="cities__right-section">
                <Map city={cityData} offers={sortedOffers} activeOfferId={activeOfferId} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
