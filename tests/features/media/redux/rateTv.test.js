import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    MEDIA_RATE_TV_BEGIN,
    MEDIA_RATE_TV_SUCCESS,
    MEDIA_RATE_TV_FAILURE,
    MEDIA_RATE_TV_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
    rateTv,
    dismissRateTvError,
    reducer,
} from '../../../../src/features/media/redux/rateTv';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const myInfo = { user_id: 5, tv_show_id: 3, rating: 5 };
const notExistUser = { user_id: 999, tv_show_id: 3, rating: 5 };
const notExistShow = { user_id: 5, tv_show_id: 999, rating: 5 };
const negRating = { user_id: 5, tv_show_id: 3, rating: -5 };
const missingArgu = { user_id: 1 };
const emptyInfo = {};

describe('media/redux/rateTv', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when rateTv succeeds', () => {
        const store = mockStore({});

        return store.dispatch(rateTv(myInfo))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_TV_SUCCESS);
            });
    });

    it('dispatches failure action when rateTv fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(rateTv())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_TV_FAILURE);
                expect(actions[1]).toHaveProperty('error', 'unsuccessful');
            });
    });

    it('dispatches failure action when rateTv fails with nonexistent user', () => {
        const store = mockStore({});

        return store.dispatch(rateTv(notExistUser))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_TV_FAILURE);
                expect(actions[1]).toHaveProperty('error', 'unsuccessful');
            });
    });

    it('dispatches failure action when rateTv fails with nonexistent tv show', () => {
        const store = mockStore({});

        return store.dispatch(rateTv(notExistShow))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_TV_FAILURE);
                expect(actions[1]).toHaveProperty('error', 'unsuccessful');
            });
    });

    it('dispatches failure action when rateTv fails with negative rating', () => {
        const store = mockStore({});

        return store.dispatch(rateTv(negRating))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_TV_FAILURE);
                expect(actions[1]).toHaveProperty('error', 'unsuccessful');
            });
    });

    it('dispatches failure action when rateTv fails with missing arguments', () => {
        const store = mockStore({});

        return store.dispatch(rateTv(missingArgu))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_TV_FAILURE);
                expect(actions[1]).toHaveProperty('error', 'unsuccessful');
            });
    });

    it('dispatches failure action when rateTv fails with empty info', () => {
        const store = mockStore({});

        return store.dispatch(rateTv(emptyInfo))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_TV_FAILURE);
                expect(actions[1]).toHaveProperty('error', 'unsuccessful');
            });
    });

    it('dispatches failure action when rateTv fails', () => {
        const store = mockStore({});

        return store.dispatch(rateTv({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_TV_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_TV_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissRateTvError', () => {
        const expectedAction = {
            type: MEDIA_RATE_TV_DISMISS_ERROR,
        };
        expect(dismissRateTvError()).toEqual(expectedAction);
    });

    it('handles action type MEDIA_RATE_TV_BEGIN correctly', () => {
        const prevState = { rateTvPending: false };
        const state = reducer(
            prevState,
            { type: MEDIA_RATE_TV_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.rateTvPending).toBe(true);
    });

    it('handles action type MEDIA_RATE_TV_SUCCESS correctly', () => {
        const prevState = { rateTvPending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_RATE_TV_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.rateTvPending).toBe(false);
    });

    it('handles action type MEDIA_RATE_TV_FAILURE correctly', () => {
        const prevState = { rateTvPending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_RATE_TV_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.rateTvPending).toBe(false);
        expect(state.rateTvError).toEqual(undefined);
    });

    it('handles action type MEDIA_RATE_TV_DISMISS_ERROR correctly', () => {
        const prevState = { rateTvError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: MEDIA_RATE_TV_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.rateTvError).toBe(null);
    });
});
