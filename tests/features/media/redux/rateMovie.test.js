import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    MEDIA_RATE_MOVIE_BEGIN,
    MEDIA_RATE_MOVIE_SUCCESS,
    MEDIA_RATE_MOVIE_FAILURE,
    MEDIA_RATE_MOVIE_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
    rateMovie,
    dismissRateMovieError,
    reducer,
} from '../../../../src/features/media/redux/rateMovie';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const myInfo = { user_id: 5, movie_id: 3, rating: 5 };
const notExistUser = { user_id: 999, movie_id: 3, rating: 5 };
const notExistMovie = { user_id: 5, movie_id: 999, rating: 5 };
const negRating = { user_id: 5, movie_id: 3, rating: -5 };
const missingArgu = { user_id: 1 };
const emptyInfo = {};

describe('media/redux/rateMovie', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when rateMovie succeeds with text info', () => {
        const store = mockStore({});

        return store.dispatch(rateMovie(myInfo))
            .then(() => {
                const actions = store.getActions();
                console.log(actions);
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_MOVIE_SUCCESS);
            });
    });

    it('dispatches failure action when rateMovie fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(rateMovie())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('error', 'unsuccessful');
            });
    });

    it('dispatches failure action when rateMovie fails with non existent user', () => {
        const store = mockStore({});

        return store.dispatch(rateMovie(notExistUser))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('error', 'unsuccessful');
            });
    });

    it('dispatches failure action when rateMovie fails with not existent movie', () => {
        const store = mockStore({});

        return store.dispatch(rateMovie(notExistMovie))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('error', 'unsuccessful');
            });
    });

    it('dispatches failure action when rateMovie fails with negative rating', () => {
        const store = mockStore({});

        return store.dispatch(rateMovie(negRating))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('error', 'unsuccessful');
            });
    });

    it('dispatches failure action when rateMovie fails with missing arguments', () => {
        const store = mockStore({});

        return store.dispatch(rateMovie(missingArgu))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('error', 'unsuccessful');
            });
    });

    it('dispatches failure action when rateMovie fails with empty info', () => {
        const store = mockStore({});

        return store.dispatch(rateMovie(emptyInfo))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('error', 'unsuccessful');
            });
    });

    it('dispatches failure action when rateMovie fails', () => {
        const store = mockStore({});

        return store.dispatch(rateMovie())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('error', 'unsuccessful');
            });
    });

    it('dispatches failure action when rateMovie fails', () => {
        const store = mockStore({});

        return store.dispatch(rateMovie({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RATE_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RATE_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissRateMovieError', () => {
        const expectedAction = {
            type: MEDIA_RATE_MOVIE_DISMISS_ERROR,
        };
        expect(dismissRateMovieError()).toEqual(expectedAction);
    });

    it('handles action type MEDIA_RATE_MOVIE_BEGIN correctly', () => {
        const prevState = { rateMoviePending: false };
        const state = reducer(
            prevState,
            { type: MEDIA_RATE_MOVIE_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.rateMoviePending).toBe(true);
    });

    it('handles action type MEDIA_RATE_MOVIE_SUCCESS correctly', () => {
        const prevState = { rateMoviePending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_RATE_MOVIE_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.rateMoviePending).toBe(false);
    });

    it('handles action type MEDIA_RATE_MOVIE_FAILURE correctly', () => {
        const prevState = { rateMoviePending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_RATE_MOVIE_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.rateMoviePending).toBe(false);
        expect(state.rateMovieError).toEqual(undefined);
    });

    it('handles action type MEDIA_RATE_MOVIE_DISMISS_ERROR correctly', () => {
        const prevState = { rateMovieError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: MEDIA_RATE_MOVIE_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.rateMovieError).toBe(null);
    });
});
