import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    MEDIA_MAKE_MOVIE_COMMENT_BEGIN,
    MEDIA_MAKE_MOVIE_COMMENT_SUCCESS,
    MEDIA_MAKE_MOVIE_COMMENT_FAILURE,
    MEDIA_MAKE_MOVIE_COMMENT_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
    makeMovieComment,
    dismissMakeMovieCommentError,
    reducer,
} from '../../../../src/features/media/redux/makeMovieComment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testInfo = { user_id: 1, movie_id: 1, comment: 'mock testing' };
const emptyInfo = {};
const missingArgu = { user_id: 1 };
const notExistUser = { user_id: 999, movie_id: 1, comment: 'mock testing' };
const notExistMovie = { user_id: 1, movie_id: 999, comment: 'mock testing' };

describe('media/redux/makeMovieComment', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when makeMovieComment succeeds with exist movie', () => {
        const store = mockStore({});

        return store.dispatch(makeMovieComment(testInfo))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_SUCCESS);
            });
    });

    it('dispatches failure action when makeMovieComment fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(makeMovieComment())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when makeMovieComment fails with empty info', () => {
        const store = mockStore({});

        return store.dispatch(makeMovieComment(emptyInfo))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when makeMovieComment fails with missing arguments', () => {
        const store = mockStore({});

        return store.dispatch(makeMovieComment(missingArgu))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when makeMovieComment fails with not exist user', () => {
        const store = mockStore({});

        return store.dispatch(makeMovieComment(notExistUser))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when makeMovieComment fails with not exist movie', () => {
        const store = mockStore({});

        return store.dispatch(makeMovieComment(notExistMovie))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });
    it('dispatches failure action when makeMovieComment fails', () => {
        const store = mockStore({});

        return store.dispatch(makeMovieComment({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_MAKE_MOVIE_COMMENT_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissMakeMovieCommentError', () => {
        const expectedAction = {
            type: MEDIA_MAKE_MOVIE_COMMENT_DISMISS_ERROR,
        };
        expect(dismissMakeMovieCommentError()).toEqual(expectedAction);
    });

    it('handles action type MEDIA_MAKE_MOVIE_COMMENT_BEGIN correctly', () => {
        const prevState = { makeMovieCommentPending: false };
        const state = reducer(
            prevState,
            { type: MEDIA_MAKE_MOVIE_COMMENT_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.makeMovieCommentPending).toBe(true);
    });

    it('handles action type MEDIA_MAKE_MOVIE_COMMENT_SUCCESS correctly', () => {
        const prevState = { makeMovieCommentPending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_MAKE_MOVIE_COMMENT_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.makeMovieCommentPending).toBe(false);
    });

    it('handles action type MEDIA_MAKE_MOVIE_COMMENT_FAILURE correctly', () => {
        const prevState = { makeMovieCommentPending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_MAKE_MOVIE_COMMENT_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.makeMovieCommentPending).toBe(false);
        expect(state.makeMovieCommentError).toEqual(undefined);
    });

    it('handles action type MEDIA_MAKE_MOVIE_COMMENT_DISMISS_ERROR correctly', () => {
        const prevState = { makeMovieCommentError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: MEDIA_MAKE_MOVIE_COMMENT_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.makeMovieCommentError).toBe(null);
    });
});
