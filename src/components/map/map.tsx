import {memo, useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {City} from '../../types/city';
import {Offer} from '../../types/offer';

type MapProps = {
  city: City;
  offers: Offer[];
  activeOfferId?: string | null;
  block?: 'cities' | 'offer';
};

const URL_TEMPLATE = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const defaultIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const activeIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({city, offers, activeOfferId, block = 'cities'}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const leafletRef = useRef<leaflet.Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && leafletRef.current === null) {
      leafletRef.current = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      leaflet
        .tileLayer(URL_TEMPLATE, {attribution: ATTRIBUTION})
        .addTo(leafletRef.current);
    }

    return () => {
      leafletRef.current?.remove();
      leafletRef.current = null;
    };
  }, [city]);

  useEffect(() => {
    if (leafletRef.current !== null) {
      const markers: leaflet.Marker[] = [];

      offers.forEach((offer) => {
        const icon = offer.id === activeOfferId ? activeIcon : defaultIcon;
        markers.push(
          leaflet
            .marker(
              {lat: offer.location.latitude, lng: offer.location.longitude},
              {icon}
            )
            .addTo(leafletRef.current!)
        );
      });

      return () => {
        markers.forEach((marker) => marker.remove());
      };
    }
  }, [offers, activeOfferId]);

  return (
    <section
      ref={mapRef}
      className={`${block}__map map`}
    />
  );
}

export default memo(Map);
