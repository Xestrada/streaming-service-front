import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    MEDIA_TV_COMMENTS_BEGIN,
    MEDIA_TV_COMMENTS_SUCCESS,
    MEDIA_TV_COMMENTS_FAILURE,
    MEDIA_TV_COMMENTS_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
    tvComments,
    dismissTvCommentsError,
    reducer,
} from '../../../../src/features/media/redux/tvComments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('media/redux/tvComments', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when tvComments succeeds with exist tv show', () => {
        const store = mockStore({});

        return store.dispatch(tvComments('Seinfeld'))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_TV_COMMENTS_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_TV_COMMENTS_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when tvComments fails with empty string', () => {
        const store = mockStore({});

        return store.dispatch(tvComments(''))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_TV_COMMENTS_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_TV_COMMENTS_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });
    it('dispatches failure action when tvComments fails', () => {
        const store = mockStore({});

        return store.dispatch(tvComments({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_TV_COMMENTS_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_TV_COMMENTS_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissTvCommentsError', () => {
        const expectedAction = {
            type: MEDIA_TV_COMMENTS_DISMISS_ERROR,
        };
        expect(dismissTvCommentsError()).toEqual(expectedAction);
    });

    it('handles action type MEDIA_TV_COMMENTS_BEGIN correctly', () => {
        const prevState = { commentsPending: false };
        const state = reducer(
            prevState,
            { type: MEDIA_TV_COMMENTS_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.commentsPending).toBe(true);
    });

    it('handles action type MEDIA_TV_COMMENTS_SUCCESS correctly', () => {
        const prevState = { commentsPending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_TV_COMMENTS_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.commentsPending).toBe(false);
    });

    it('handles action type MEDIA_TV_COMMENTS_FAILURE correctly', () => {
        const prevState = { commentsPending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_TV_COMMENTS_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.commentsPending).toBe(false);
        expect(state.commentsError).toEqual(undefined);
    });

    it('handles action type MEDIA_TV_COMMENTS_DISMISS_ERROR correctly', () => {
        const prevState = { commentsError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: MEDIA_TV_COMMENTS_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.commentsError).toBe(null);
    });
});
