import reducers from './reducers';
import { createStore, Store } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const createAppStore = (): Store =>
  createStore(enableBatching(reducers), composeWithDevTools());

export default createAppStore();
