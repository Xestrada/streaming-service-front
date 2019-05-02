import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    COMMON_CHECK_FRIENDSHIP_BEGIN,
    COMMON_CHECK_FRIENDSHIP_SUCCESS,
    COMMON_CHECK_FRIENDSHIP_FAILURE,
    COMMON_CHECK_FRIENDSHIP_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
    checkFriendship,
    dismissCheckFriendshipError,
    reducer,
} from '../../../../src/features/common/redux/checkFriendship';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/checkFriendship', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when checkFriendship succeeds with id 1 and 1', () => {
        const store = mockStore({});

        return store.dispatch(checkFriendship(1, 1))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches success action when checkFriendship succeeds with id 2 and 3', () => {
        const store = mockStore({});

        return store.dispatch(checkFriendship(2, 3))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when checkFriendship fails with one negative id', () => {
        const store = mockStore({});

        return store.dispatch(checkFriendship(-1, 3))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when checkFriendship fails with string', () => {
        const store = mockStore({});

        return store.dispatch(checkFriendship('', 3))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when checkFriendship fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(checkFriendship())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when checkFriendship fails with only 1 paremeter', () => {
        const store = mockStore({});

        return store.dispatch(checkFriendship(3))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when checkFriendship fails', () => {
        const store = mockStore({});

        return store.dispatch(checkFriendship({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_CHECK_FRIENDSHIP_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissCheckFriendshipError', () => {
        const expectedAction = {
            type: COMMON_CHECK_FRIENDSHIP_DISMISS_ERROR,
        };
        expect(dismissCheckFriendshipError()).toEqual(expectedAction);
    });

    it('handles action type COMMON_CHECK_FRIENDSHIP_BEGIN correctly', () => {
        const prevState = { checkFriendshipPending: false };
        const state = reducer(
            prevState,
            { type: COMMON_CHECK_FRIENDSHIP_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.checkFriendshipPending).toBe(true);
    });

    it('handles action type COMMON_CHECK_FRIENDSHIP_SUCCESS correctly', () => {
        const prevState = { checkFriendshipPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_CHECK_FRIENDSHIP_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.checkFriendshipPending).toBe(false);
    });

    it('handles action type COMMON_CHECK_FRIENDSHIP_FAILURE correctly', () => {
        const prevState = { checkFriendshipPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_CHECK_FRIENDSHIP_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.checkFriendshipPending).toBe(false);
        expect(state.checkFriendshipError).toEqual(undefined);
    });

    it('handles action type COMMON_CHECK_FRIENDSHIP_DISMISS_ERROR correctly', () => {
        const prevState = { checkFriendshipError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: COMMON_CHECK_FRIENDSHIP_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.checkFriendshipError).toBe(null);
    });
});
