import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    COMMON_RATED_TV_BEGIN,
    COMMON_RATED_TV_SUCCESS,
    COMMON_RATED_TV_FAILURE,
    COMMON_RATED_TV_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
    ratedTv,
    dismissRatedTvError,
    reducer,
} from '../../../../src/features/common/redux/ratedTv';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/ratedTv', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when ratedTv succeeds with id:1', () => {
        const store = mockStore({});

        return store.dispatch(ratedTv(1))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_RATED_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_RATED_TV_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches success action when ratedTv succeeds with id:2', () => {
        const store = mockStore({});

        return store.dispatch(ratedTv(2))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_RATED_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_RATED_TV_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when ratedTv fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(ratedTv())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_RATED_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_RATED_TV_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when ratedTv fails with negative id', () => {
        const store = mockStore({});

        return store.dispatch(ratedTv())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_RATED_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_RATED_TV_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when ratedTv fails with string', () => {
        const store = mockStore({});

        return store.dispatch(ratedTv())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_RATED_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_RATED_TV_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });
    it('dispatches failure action when ratedTv fails', () => {
        const store = mockStore({});

        return store.dispatch(ratedTv({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_RATED_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_RATED_TV_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissRatedTvError', () => {
        const expectedAction = {
            type: COMMON_RATED_TV_DISMISS_ERROR,
        };
        expect(dismissRatedTvError()).toEqual(expectedAction);
    });

    it('handles action type COMMON_RATED_TV_BEGIN correctly', () => {
        const prevState = { ratedTvPending: false };
        const state = reducer(
            prevState,
            { type: COMMON_RATED_TV_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.ratedTvPending).toBe(true);
    });

    it('handles action type COMMON_RATED_TV_SUCCESS correctly', () => {
        const prevState = { ratedTvPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_RATED_TV_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.ratedTvPending).toBe(false);
    });

    it('handles action type COMMON_RATED_TV_FAILURE correctly', () => {
        const prevState = { ratedTvPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_RATED_TV_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.ratedTvPending).toBe(false);
        expect(state.ratedTvError).toEqual(undefined);
    });

    it('handles action type COMMON_RATED_TV_DISMISS_ERROR correctly', () => {
        const prevState = { ratedTvError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: COMMON_RATED_TV_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.ratedTvError).toBe(null);
    });
});
