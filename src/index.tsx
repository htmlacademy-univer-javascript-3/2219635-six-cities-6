import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {store} from './store';
import {fetchOffers, checkAuth, fetchFavorites} from './store/api-actions';

store.dispatch(fetchOffers());
store.dispatch(checkAuth()).then((result) => {
  if (checkAuth.fulfilled.match(result)) {
    store.dispatch(fetchFavorites());
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
