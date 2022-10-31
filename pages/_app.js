import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../lib/interceptor'
import { Provider } from 'react-redux';
import { persistor, store } from '../lib/store';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }) {
  return (
    <PersistGate loading={null} persistor={persistor}>

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </PersistGate>

  )
}

export default MyApp
