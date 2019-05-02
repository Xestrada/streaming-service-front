import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    PROFILE_COMMENT_POST_BEGIN,
    PROFILE_COMMENT_POST_SUCCESS,
    PROFILE_COMMENT_POST_FAILURE,
    PROFILE_COMMENT_POST_DISMISS_ERROR,
} from '../../../../src/features/profile/redux/constants';

import {
    commentPost,
    dismissCommentPostError,
    reducer,
} from '../../../../src/features/profile/redux/commentPost';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const myInfo = { post_id: 1, user_id: 2, comment: 'mock testing' };
const notFriend = { post_id: 1, user_id: 5, comment: 'mock testing' };
const notExistUser = { post_id: 1, user_id: 999, comment: 'mock testing' };
const notExistPUser = { post_id: 999, user_id: 2, comment: 'mock testing' };
const missingArgu = { user_id: 1 };
const emptyInfo = {};

describe('profile/redux/commentPost', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when commentPost succeeds', () => {
        const store = mockStore({});

        return store.dispatch(commentPost(myInfo))
            .then(() => {
                const actions = store.getActions();
                console.log(actions);
                expect(actions[0]).toHaveProperty('type', PROFILE_COMMENT_POST_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_COMMENT_POST_SUCCESS);
            });
    });

    it('dispatches failure action when commentPost fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(commentPost())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_COMMENT_POST_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_COMMENT_POST_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when commentPost fails with not a friend', () => {
        const store = mockStore({});

        return store.dispatch(commentPost(notFriend))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_COMMENT_POST_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_COMMENT_POST_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when commentPost fails with nonexistent user', () => {
        const store = mockStore({});

        return store.dispatch(commentPost(notExistUser))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_COMMENT_POST_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_COMMENT_POST_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when commentPost fails with nonexistent post user', () => {
        const store = mockStore({});

        return store.dispatch(commentPost(notExistPUser))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_COMMENT_POST_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_COMMENT_POST_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when commentPost fails with missing arguments', () => {
        const store = mockStore({});

        return store.dispatch(commentPost(missingArgu))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_COMMENT_POST_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_COMMENT_POST_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });
    it('dispatches failure action when commentPost fails with empty info', () => {
        const store = mockStore({});

        return store.dispatch(commentPost(emptyInfo))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_COMMENT_POST_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_COMMENT_POST_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when commentPost fails', () => {
        const store = mockStore({});

        return store.dispatch(commentPost({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_COMMENT_POST_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_COMMENT_POST_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissCommentPostError', () => {
        const expectedAction = {
            type: PROFILE_COMMENT_POST_DISMISS_ERROR,
        };
        expect(dismissCommentPostError()).toEqual(expectedAction);
    });

    it('handles action type PROFILE_COMMENT_POST_BEGIN correctly', () => {
        const prevState = { commentPostPending: false };
        const state = reducer(
            prevState,
            { type: PROFILE_COMMENT_POST_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.commentPostPending).toBe(true);
    });

    it('handles action type PROFILE_COMMENT_POST_SUCCESS correctly', () => {
        const prevState = { commentPostPending: true };
        const state = reducer(
            prevState,
            { type: PROFILE_COMMENT_POST_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.commentPostPending).toBe(false);
    });

    it('handles action type PROFILE_COMMENT_POST_FAILURE correctly', () => {
        const prevState = { commentPostPending: true };
        const state = reducer(
            prevState,
            { type: PROFILE_COMMENT_POST_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.commentPostPending).toBe(false);
        expect(state.commentPostError).toEqual(undefined);
    });

    it('handles action type PROFILE_COMMENT_POST_DISMISS_ERROR correctly', () => {
        const prevState = { commentPostError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: PROFILE_COMMENT_POST_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.commentPostError).toBe(null);
    });
});
