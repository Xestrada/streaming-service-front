import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    COMMON_SENT_FRIEND_REQUEST_BEGIN,
    COMMON_SENT_FRIEND_REQUEST_SUCCESS,
    COMMON_SENT_FRIEND_REQUEST_FAILURE,
    COMMON_SENT_FRIEND_REQUEST_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
    sentFriendRequest,
    dismissSentFriendRequestError,
    reducer,
} from '../../../../src/features/common/redux/sentFriendRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/sentFriendRequest', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when sentFriendRequest succeeds', () => {
        const store = mockStore({});

        return store.dispatch(sentFriendRequest(5, 3))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_SENT_FRIEND_REQUEST_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_SENT_FRIEND_REQUEST_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when sentFriendRequest fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(sentFriendRequest())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_SENT_FRIEND_REQUEST_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_SENT_FRIEND_REQUEST_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when sentFriendRequest fails with nonexistent id/fid', () => {
        const store = mockStore({});

        return store.dispatch(sentFriendRequest(1, -1))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_SENT_FRIEND_REQUEST_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_SENT_FRIEND_REQUEST_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when sentFriendRequest fails with string', () => {
        const store = mockStore({});

        return store.dispatch(sentFriendRequest('', ''))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_SENT_FRIEND_REQUEST_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_SENT_FRIEND_REQUEST_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when sentFriendRequest fails', () => {
        const store = mockStore({});

        return store.dispatch(sentFriendRequest({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_SENT_FRIEND_REQUEST_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_SENT_FRIEND_REQUEST_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissSentFriendRequestError', () => {
        const expectedAction = {
            type: COMMON_SENT_FRIEND_REQUEST_DISMISS_ERROR,
        };
        expect(dismissSentFriendRequestError()).toEqual(expectedAction);
    });

    it('handles action type COMMON_SENT_FRIEND_REQUEST_BEGIN correctly', () => {
        const prevState = { sentFriendRequestPending: false };
        const state = reducer(
            prevState,
            { type: COMMON_SENT_FRIEND_REQUEST_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.sentFriendRequestPending).toBe(true);
    });

    it('handles action type COMMON_SENT_FRIEND_REQUEST_SUCCESS correctly', () => {
        const prevState = { sentFriendRequestPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_SENT_FRIEND_REQUEST_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.sentFriendRequestPending).toBe(false);
    });

    it('handles action type COMMON_SENT_FRIEND_REQUEST_FAILURE correctly', () => {
        const prevState = { sentFriendRequestPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_SENT_FRIEND_REQUEST_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.sentFriendRequestPending).toBe(false);
        expect(state.sentFriendRequestError).toEqual(undefined);
    });

    it('handles action type COMMON_SENT_FRIEND_REQUEST_DISMISS_ERROR correctly', () => {
        const prevState = { sentFriendRequestError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: COMMON_SENT_FRIEND_REQUEST_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.sentFriendRequestError).toBe(null);
    });
});
