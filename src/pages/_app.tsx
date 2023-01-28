import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { AppProps } from 'next/app';
import '../assets/styles/style.css';
import '../assets/styles/bootstrap.min.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  );
};

export default App;
