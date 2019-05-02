import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    MEDIA_MOVIE_COMMENTS_BEGIN,
    MEDIA_MOVIE_COMMENTS_SUCCESS,
    MEDIA_MOVIE_COMMENTS_FAILURE,
    MEDIA_MOVIE_COMMENTS_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
    movieComments,
    dismissMovieCommentsError,
    reducer,
} from '../../../../src/features/media/redux/movieComments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('media/redux/movieComments', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when movieComments succeeds with exist movie', () => {
        const store = mockStore({});

        return store.dispatch(movieComments('Bird Box'))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_MOVIE_COMMENTS_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_MOVIE_COMMENTS_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when movieComments fails with empty string', () => {
        const store = mockStore({});

        return store.dispatch(movieComments(''))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_MOVIE_COMMENTS_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_MOVIE_COMMENTS_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when movieComments fails', () => {
        const store = mockStore({});

        return store.dispatch(movieComments({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_MOVIE_COMMENTS_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_MOVIE_COMMENTS_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissMovieCommentsError', () => {
        const expectedAction = {
            type: MEDIA_MOVIE_COMMENTS_DISMISS_ERROR,
        };
        expect(dismissMovieCommentsError()).toEqual(expectedAction);
    });

    it('handles action type MEDIA_MOVIE_COMMENTS_BEGIN correctly', () => {
        const prevState = { commentsPending: false };
        const state = reducer(
            prevState,
            { type: MEDIA_MOVIE_COMMENTS_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.commentsPending).toBe(true);
    });

    it('handles action type MEDIA_MOVIE_COMMENTS_SUCCESS correctly', () => {
        const prevState = { commentsPending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_MOVIE_COMMENTS_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.commentsPending).toBe(false);
    });

    it('handles action type MEDIA_MOVIE_COMMENTS_FAILURE correctly', () => {
        const prevState = { commentsPending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_MOVIE_COMMENTS_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.commentsPending).toBe(false);
        expect(state.commentsError).toEqual(undefined);
    });

    it('handles action type MEDIA_MOVIE_COMMENTS_DISMISS_ERROR correctly', () => {
        const prevState = { commentsError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: MEDIA_MOVIE_COMMENTS_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.commentsError).toBe(null);
    });
});
