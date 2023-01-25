import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Repositories from './index';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Provider store={store}>
      <Repositories />
    </Provider>
  );
}

export default App;
