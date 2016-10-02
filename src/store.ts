import reducers from './reducers';
import {createStore} from 'redux';
import {enableBatching} from 'redux-batched-actions';

export let createAppStore = () =>
    createStore(enableBatching(reducers));

export default createAppStore();
