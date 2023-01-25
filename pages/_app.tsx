import React from 'react';
import { Provider } from 'react-redux';
import store from '@/reducers';
import Repositories from './index';

const App = () => {
  return (
    <Provider store={store}>
      <Repositories />
    </Provider>
  );
};

export default App;