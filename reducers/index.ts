import { createStore, combineReducers } from 'redux';
import repositories from './repositories';

const rootReducer = combineReducers({
    repositories,
});

const store = createStore(rootReducer);

export default store;
