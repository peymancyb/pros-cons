import { createStore } from 'redux';
import { combinedReducers } from 'redux-store/reducers'

const store = createStore(combinedReducers);
export default store;