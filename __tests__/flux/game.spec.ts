import * as actions from 'flux/game';
import {createAppStore} from 'store';
import schema from 'reducers/schema';

const STORE_ID: string = 'game';

let store;

const getState = () =>
    store.getState()[STORE_ID];

describe('Game Store', () => {
    beforeEach(() => {
        store = createAppStore();
    });

    it('should have initial state', () => {
        expect(getState()).toEqual(schema[STORE_ID]);
    });

    it('should init', () => {
        store.dispatch(actions.init(['foo', 'bar']));
        expect(getState().list).toEqual(['foo', 'bar']);
    });

    it('should finish', () => {
        store.dispatch(actions.finish());
        expect(getState().finished).toBe(true);
    });

    it('should set', () => {
        store.getState()[STORE_ID] = store.getState()[STORE_ID].set('finished', true);
        // Ensure correct mock
        expect(getState().finished).toBe(true);

        store.dispatch(actions.set('foo'));

        expect(getState().finished).toBe(false);
        expect(getState().currentGame).toBe('foo');
    });
});
