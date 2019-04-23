import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    MEDIA_GET_USER_RATING_BEGIN,
    MEDIA_GET_USER_RATING_SUCCESS,
    MEDIA_GET_USER_RATING_FAILURE,
    MEDIA_GET_USER_RATING_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
    getUserRating,
    dismissGetUserRatingError,
    reducer,
} from '../../../../src/features/media/redux/getUserRating';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('media/redux/getUserRating', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when getUserRating succeeds with movie', () => {
        const store = mockStore({});

        return store.dispatch(getUserRating(true, 1, 1))
            .then(() => {
                const actions = store.getActions();
                console.log(actions);
                expect(actions[0]).toHaveProperty('type', MEDIA_GET_USER_RATING_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_GET_USER_RATING_SUCCESS);
                expect(actions[1]).toHaveProperty('userRating', expect.anything());
            });
    });

    it('dispatches success action when getUserRating succeeds with movie', () => {
        const store = mockStore({});

        return store.dispatch(getUserRating(true, 1, 1))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_GET_USER_RATING_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_GET_USER_RATING_SUCCESS);
                expect(actions[1]).toHaveProperty('userRating', expect.anything());
            });
    });

    it('dispatches success action when getUserRating succeeds with movie', () => {
        const store = mockStore({});

        return store.dispatch(getUserRating(true, 1, 1))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_GET_USER_RATING_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_GET_USER_RATING_SUCCESS);
                expect(actions[1]).toHaveProperty('userRating', expect.anything());
            });
    });

    it('dispatches success action when getUserRating succeeds with tv show', () => {
        const store = mockStore({});

        return store.dispatch(getUserRating(false, 1, 1))
            .then(() => {
                const actions = store.getActions();
                console.log(actions);
                expect(actions[0]).toHaveProperty('type', MEDIA_GET_USER_RATING_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_GET_USER_RATING_SUCCESS);
                expect(actions[1]).toHaveProperty('userRating', expect.anything());
            });
    });

    it('dispatches failure action when getUserRating fails with movie', () => {
        const store = mockStore({});

        return store.dispatch(getUserRating(true, 1, 0))
            .then(() => {
                const actions = store.getActions();
                console.log(actions);
                expect(actions[0]).toHaveProperty('type', MEDIA_GET_USER_RATING_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_GET_USER_RATING_FAILURE);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when getUserRating fails with tv show', () => {
        const store = mockStore({});

        return store.dispatch(getUserRating(false, 0, 1))
            .then(() => {
                const actions = store.getActions();
                console.log(actions);
                expect(actions[0]).toHaveProperty('type', MEDIA_GET_USER_RATING_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_GET_USER_RATING_FAILURE);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches success action when getUserRating succeeds', () => {
        const store = mockStore({});

        return store.dispatch(getUserRating(true, 1, 1))
            .then(() => {
                const actions = store.getActions();
                console.log(actions);
                expect(actions[0]).toHaveProperty('type', MEDIA_GET_USER_RATING_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_GET_USER_RATING_SUCCESS);
                expect(actions[1]).toHaveProperty('userRating', expect.anything());
            });
    });

    it('dispatches failure action when getUserRating fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(getUserRating())
            .then(() => {
                const actions = store.getActions();
                console.log(actions);
                expect(actions[0]).toHaveProperty('type', MEDIA_GET_USER_RATING_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_GET_USER_RATING_FAILURE);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when getUserRating fails with string', () => {
        const store = mockStore({});

        return store.dispatch(getUserRating(true, '', ''))
            .then(() => {
                const actions = store.getActions();
                console.log(actions);
                expect(actions[0]).toHaveProperty('type', MEDIA_GET_USER_RATING_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_GET_USER_RATING_FAILURE);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when getUserRating fails', () => {
        const store = mockStore({});

        return store.dispatch(getUserRating({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_GET_USER_RATING_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_GET_USER_RATING_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissGetUserRatingError', () => {
        const expectedAction = {
            type: MEDIA_GET_USER_RATING_DISMISS_ERROR,
        };
        expect(dismissGetUserRatingError()).toEqual(expectedAction);
    });

    it('handles action type MEDIA_GET_USER_RATING_BEGIN correctly', () => {
        const prevState = { getUserRatingPending: false };
        const state = reducer(
            prevState,
            { type: MEDIA_GET_USER_RATING_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getUserRatingPending).toBe(true);
    });

    it('handles action type MEDIA_GET_USER_RATING_SUCCESS correctly', () => {
        const prevState = { getUserRatingPending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_GET_USER_RATING_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getUserRatingPending).toBe(false);
    });

    it('handles action type MEDIA_GET_USER_RATING_FAILURE correctly', () => {
        const prevState = { getUserRatingPending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_GET_USER_RATING_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getUserRatingPending).toBe(false);
        expect(state.getUserRatingError).toEqual(expect.anything());
    });

    it('handles action type MEDIA_GET_USER_RATING_DISMISS_ERROR correctly', () => {
        const prevState = { getUserRatingError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: MEDIA_GET_USER_RATING_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getUserRatingError).toBe(null);
    });
});
