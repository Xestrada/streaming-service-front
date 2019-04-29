import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    COMMON_GET_USER_SUBS_BEGIN,
    COMMON_GET_USER_SUBS_SUCCESS,
    COMMON_GET_USER_SUBS_FAILURE,
    COMMON_GET_USER_SUBS_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
    getUserSubs,
    dismissGetUserSubsError,
    reducer,
} from '../../../../src/features/common/redux/getUserSubs';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/getUserSubs', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when getUserSubs succeeds with id 1', () => {
        const store = mockStore({});

        return store.dispatch(getUserSubs(1))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_USER_SUBS_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_USER_SUBS_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches success action when getUserSubs succeeds with id 3', () => {
        const store = mockStore({});

        return store.dispatch(getUserSubs(3))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_USER_SUBS_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_USER_SUBS_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when getUserSubs fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(getUserSubs())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_USER_SUBS_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_USER_SUBS_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when getUserSubs fails with negative id', () => {
        const store = mockStore({});

        return store.dispatch(getUserSubs(-1))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_USER_SUBS_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_USER_SUBS_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when getUserSubs fails with string', () => {
        const store = mockStore({});

        return store.dispatch(getUserSubs(''))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_USER_SUBS_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_USER_SUBS_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when getUserSubs fails with nonexistent id', () => {
        const store = mockStore({});

        return store.dispatch(getUserSubs(999))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_USER_SUBS_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_USER_SUBS_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });
    it('dispatches failure action when getUserSubs fails', () => {
        const store = mockStore({});

        return store.dispatch(getUserSubs({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_USER_SUBS_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_USER_SUBS_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissGetUserSubsError', () => {
        const expectedAction = {
            type: COMMON_GET_USER_SUBS_DISMISS_ERROR,
        };
        expect(dismissGetUserSubsError()).toEqual(expectedAction);
    });

    it('handles action type COMMON_GET_USER_SUBS_BEGIN correctly', () => {
        const prevState = { getUserSubsPending: false };
        const state = reducer(
            prevState,
            { type: COMMON_GET_USER_SUBS_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getUserSubsPending).toBe(true);
    });

    it('handles action type COMMON_GET_USER_SUBS_SUCCESS correctly', () => {
        const prevState = { getUserSubsPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_GET_USER_SUBS_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getUserSubsPending).toBe(false);
    });

    it('handles action type COMMON_GET_USER_SUBS_FAILURE correctly', () => {
        const prevState = { getUserSubsPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_GET_USER_SUBS_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getUserSubsPending).toBe(false);
        expect(state.getUserSubsError).toEqual(undefined);
    });

    it('handles action type COMMON_GET_USER_SUBS_DISMISS_ERROR correctly', () => {
        const prevState = { getUserSubsError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: COMMON_GET_USER_SUBS_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getUserSubsError).toBe(null);
    });
});
