import * as Actions from 'flux/collocation';
import {createAppStore} from 'store';
import schema from 'reducers/schema';
import {RIVERSIDE_LEFT, RIVERSIDE_RIGHT, BOAT} from 'games';

const STORE_ID: string = 'collocation';

let store;

const getState = () =>
    store.getState()[STORE_ID];

describe('Collocation Store', () => {
    beforeEach(() => {
        store = createAppStore();
    });

    it('should have initial state', () => {
        expect(getState()).toEqual(schema.collocation);
    });
});
