import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  );
};

export default App;
