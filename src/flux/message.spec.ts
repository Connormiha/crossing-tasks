import * as Actions from 'flux/message';
import { createAppStore } from 'store';
import schema from 'reducers/schema';

const STORE_ID = 'message';

let store;

const getState = () => store.getState()[STORE_ID];

describe('Message Store', () => {
  beforeEach(() => {
    store = createAppStore();
  });

  it('should have initial state', () => {
    expect(getState()).toEqual(schema.message);
  });

  it('should set message', () => {
    store.dispatch(Actions.set('Foo'));
    expect(getState().content).toBe('Foo');
  });
});
