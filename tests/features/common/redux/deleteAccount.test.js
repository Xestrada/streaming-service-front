import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    COMMON_DELETE_ACCOUNT_BEGIN,
    COMMON_DELETE_ACCOUNT_SUCCESS,
    COMMON_DELETE_ACCOUNT_FAILURE,
    COMMON_DELETE_ACCOUNT_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
    deleteAccount,
    dismissDeleteAccountError,
    reducer,
} from '../../../../src/features/common/redux/deleteAccount';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const myInfo = { user_id: 1, password: 'cs4800Video' };
const wrongPassword = { user_id: 1, password: '28haod28y9' };
const notExistUser = { user_id: 999, password: 'password' };
const missingArgu = { user_id: 1 };
const emptyInfo = {};

describe('common/redux/deleteAccount', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when deleteAccount succeeds', () => {
        const store = mockStore({});

        return store.dispatch(deleteAccount())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_SUCCESS);
            });
    });

    it('dispatches failure action when deleteAccount fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(deleteAccount())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when deleteAccount fails with wrong password', () => {
        const store = mockStore({});

        return store.dispatch(deleteAccount(wrongPassword))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when deleteAccount fails with not exist user', () => {
        const store = mockStore({});

        return store.dispatch(deleteAccount(notExistUser))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when deleteAccount fails with missing arguments', () => {
        const store = mockStore({});

        return store.dispatch(deleteAccount(missingArgu))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });
    it('dispatches failure action when deleteAccount fails with empty info', () => {
        const store = mockStore({});

        return store.dispatch(deleteAccount(emptyInfo))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when deleteAccount fails', () => {
        const store = mockStore({});

        return store.dispatch(deleteAccount())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });
    it('dispatches failure action when deleteAccount fails', () => {
        const store = mockStore({});

        return store.dispatch(deleteAccount({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DELETE_ACCOUNT_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissDeleteAccountError', () => {
        const expectedAction = {
            type: COMMON_DELETE_ACCOUNT_DISMISS_ERROR,
        };
        expect(dismissDeleteAccountError()).toEqual(expectedAction);
    });

    it('handles action type COMMON_DELETE_ACCOUNT_BEGIN correctly', () => {
        const prevState = { deleteAccountPending: false };
        const state = reducer(
            prevState,
            { type: COMMON_DELETE_ACCOUNT_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.deleteAccountPending).toBe(true);
    });

    it('handles action type COMMON_DELETE_ACCOUNT_SUCCESS correctly', () => {
        const prevState = { deleteAccountPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_DELETE_ACCOUNT_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.deleteAccountPending).toBe(false);
    });

    it('handles action type COMMON_DELETE_ACCOUNT_FAILURE correctly', () => {
        const prevState = { deleteAccountPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_DELETE_ACCOUNT_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.deleteAccountPending).toBe(false);
        expect(state.deleteAccountError).toEqual(undefined);
    });

    it('handles action type COMMON_DELETE_ACCOUNT_DISMISS_ERROR correctly', () => {
        const prevState = { deleteAccountError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: COMMON_DELETE_ACCOUNT_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.deleteAccountError).toBe(null);
    });
});
