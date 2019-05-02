import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    MEDIA_RENT_MOVIE_BEGIN,
    MEDIA_RENT_MOVIE_SUCCESS,
    MEDIA_RENT_MOVIE_FAILURE,
    MEDIA_RENT_MOVIE_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
    rentMovie,
    dismissRentMovieError,
    reducer,
} from '../../../../src/features/media/redux/rentMovie';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const notExistUser = { user_id: 999, movie_id: 1 };
const notExistMovie = { user_id: 5, movie_id: 999 };
const missingArgu = { user_id: 1 };
const emptyInfo = {};

describe('media/redux/rentMovie', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches failure action when rentMovie fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(rentMovie())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RENT_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RENT_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when rentMovie fails with nonexistent user', () => {
        const store = mockStore({});

        return store.dispatch(rentMovie(notExistUser))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RENT_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RENT_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when rentMovie fails with nonexistent movie', () => {
        const store = mockStore({});

        return store.dispatch(rentMovie(notExistMovie))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RENT_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RENT_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when rentMovie fails with missing arguments', () => {
        const store = mockStore({});

        return store.dispatch(rentMovie(missingArgu))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RENT_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RENT_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when rentMovie fails with empty info', () => {
        const store = mockStore({});

        return store.dispatch(rentMovie(emptyInfo))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RENT_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RENT_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when rentMovie fails', () => {
        const store = mockStore({});

        return store.dispatch(rentMovie({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RENT_MOVIE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RENT_MOVIE_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissRentMovieError', () => {
        const expectedAction = {
            type: MEDIA_RENT_MOVIE_DISMISS_ERROR,
        };
        expect(dismissRentMovieError()).toEqual(expectedAction);
    });

    it('handles action type MEDIA_RENT_MOVIE_BEGIN correctly', () => {
        const prevState = { rentMoviePending: false };
        const state = reducer(
            prevState,
            { type: MEDIA_RENT_MOVIE_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.rentMoviePending).toBe(true);
    });

    it('handles action type MEDIA_RENT_MOVIE_SUCCESS correctly', () => {
        const prevState = { rentMoviePending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_RENT_MOVIE_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.rentMoviePending).toBe(false);
    });

    it('handles action type MEDIA_RENT_MOVIE_FAILURE correctly', () => {
        const prevState = { rentMoviePending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_RENT_MOVIE_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.rentMoviePending).toBe(false);
        expect(state.rentMovieError).toEqual(undefined);
    });

    it('handles action type MEDIA_RENT_MOVIE_DISMISS_ERROR correctly', () => {
        const prevState = { rentMovieError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: MEDIA_RENT_MOVIE_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.rentMovieError).toBe(null);
    });
});
