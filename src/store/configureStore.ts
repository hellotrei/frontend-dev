import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const middleware = [...getDefaultMiddleware(), thunk];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});