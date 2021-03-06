import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    COMMON_GET_RENTED_BEGIN,
    COMMON_GET_RENTED_SUCCESS,
    COMMON_GET_RENTED_FAILURE,
    COMMON_GET_RENTED_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
    getRented,
    dismissGetRentedError,
    reducer,
} from '../../../../src/features/common/redux/getRented';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/getRented', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when getRented succeeds with id:0', () => {
        const store = mockStore({});
        return store.dispatch(getRented(0))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_RENTED_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_RENTED_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches success action when getRented succeeds with id:1', () => {
        const store = mockStore({});
        return store.dispatch(getRented(1))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_RENTED_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_RENTED_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches success action when getRented succeeds with id:2', () => {
        const store = mockStore({});
        return store.dispatch(getRented(2))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_RENTED_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_RENTED_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches success action when getRented succeeds with id:3', () => {
        const store = mockStore({});
        return store.dispatch(getRented(3))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_RENTED_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_RENTED_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches success action when getRented succeeds with id:4', () => {
        const store = mockStore({});
        return store.dispatch(getRented(4))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_RENTED_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_RENTED_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches success action when getRented succeeds with id:5', () => {
        const store = mockStore({});
        return store.dispatch(getRented(5))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_RENTED_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_RENTED_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when getRented fails with empty id', () => {
        const store = mockStore({});

        return store.dispatch(getRented(0))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_RENTED_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_RENTED_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when getRented fails with string', () => {
        const store = mockStore({});

        return store.dispatch(getRented(''))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_RENTED_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_RENTED_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when getRented fails with negative id', () => {
        const store = mockStore({});

        return store.dispatch(getRented(-1))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_RENTED_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_RENTED_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when getRented fails', () => {
        const store = mockStore({});

        return store.dispatch(getRented({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_GET_RENTED_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_GET_RENTED_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissGetRentedError', () => {
        const expectedAction = {
            type: COMMON_GET_RENTED_DISMISS_ERROR,
        };
        expect(dismissGetRentedError()).toEqual(expectedAction);
    });

    it('handles action type COMMON_GET_RENTED_BEGIN correctly', () => {
        const prevState = { getRentedPending: false };
        const state = reducer(
            prevState,
            { type: COMMON_GET_RENTED_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getRentedPending).toBe(true);
    });

    it('handles action type COMMON_GET_RENTED_SUCCESS correctly', () => {
        const prevState = { getRentedPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_GET_RENTED_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getRentedPending).toBe(false);
    });

    it('handles action type COMMON_GET_RENTED_FAILURE correctly', () => {
        const prevState = { getRentedPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_GET_RENTED_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getRentedPending).toBe(false);
        expect(state.getRentedError).toEqual(undefined);
    });

    it('handles action type COMMON_GET_RENTED_DISMISS_ERROR correctly', () => {
        const prevState = { getRentedError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: COMMON_GET_RENTED_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getRentedError).toBe(null);
    });
});
