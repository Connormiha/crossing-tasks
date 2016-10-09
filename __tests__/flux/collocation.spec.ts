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

    it('should init', () => {
        store.dispatch(Actions.init({
            [RIVERSIDE_LEFT]: ['foo', 'bar'],
            [RIVERSIDE_RIGHT]: [],
            [BOAT]: []
        }));

        expect(getState().boatPosition).toBe(RIVERSIDE_LEFT);
        expect(getState()[RIVERSIDE_LEFT]).toEqual(['foo', 'bar']);
        expect(getState()[RIVERSIDE_RIGHT]).toEqual([]);
        expect(getState()[BOAT]).toEqual([]);
    });
});
