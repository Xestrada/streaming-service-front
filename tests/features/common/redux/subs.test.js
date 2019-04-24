import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    COMMON_SUBS_BEGIN,
    COMMON_SUBS_SUCCESS,
    COMMON_SUBS_FAILURE,
    COMMON_SUBS_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
    getSubs,
    dismissSubsError,
    reducer,
} from '../../../../src/features/common/redux/subs';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/subs', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when subs succeeds', () => {
        const store = mockStore({});

        return store.dispatch(getSubs(1))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_SUBS_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_SUBS_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches success action when subs succeeds', () => {
        const store = mockStore({});

        return store.dispatch(getSubs(2))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_SUBS_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_SUBS_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when subs fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(getSubs())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_SUBS_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_SUBS_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when subs fails with negative id', () => {
        const store = mockStore({});

        return store.dispatch(getSubs(-1))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_SUBS_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_SUBS_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when subs fails with string', () => {
        const store = mockStore({});

        return store.dispatch(getSubs(''))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_SUBS_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_SUBS_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });
    it('dispatches failure action when subs fails', () => {
        const store = mockStore({});

        return store.dispatch(getSubs({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_SUBS_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_SUBS_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissSubsError', () => {
        const expectedAction = {
            type: COMMON_SUBS_DISMISS_ERROR,
        };
        expect(dismissSubsError()).toEqual(expectedAction);
    });

    it('handles action type COMMON_SUBS_BEGIN correctly', () => {
        const prevState = { subsPending: false };
        const state = reducer(
            prevState,
            { type: COMMON_SUBS_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.subsPending).toBe(true);
    });

    it('handles action type COMMON_SUBS_SUCCESS correctly', () => {
        const prevState = { subsPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_SUBS_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.subsPending).toBe(false);
    });

    it('handles action type COMMON_SUBS_FAILURE correctly', () => {
        const prevState = { subsPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_SUBS_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.subsPending).toBe(false);
        expect(state.subsError).toEqual(expect.anything());
    });

    it('handles action type COMMON_SUBS_DISMISS_ERROR correctly', () => {
        const prevState = { subsError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: COMMON_SUBS_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.subsError).toBe(null);
    });
});
