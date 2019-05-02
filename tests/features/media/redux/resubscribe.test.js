import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    MEDIA_RESUBSCRIBE_BEGIN,
    MEDIA_RESUBSCRIBE_SUCCESS,
    MEDIA_RESUBSCRIBE_FAILURE,
    MEDIA_RESUBSCRIBE_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
    resubscribe,
    dismissResubscribeError,
    reducer,
} from '../../../../src/features/media/redux/resubscribe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('media/redux/resubscribe', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when resubscribe succeeds with user id 1 and tv show id 1', () => {
        const store = mockStore({});

        return store.dispatch(resubscribe(1, 1))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RESUBSCRIBE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RESUBSCRIBE_SUCCESS);
            });
    });

    it('dispatches success action when resubscribe succeeds with user id 2 and tv show id 1', () => {
        const store = mockStore({});

        return store.dispatch(resubscribe(2, 1))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RESUBSCRIBE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RESUBSCRIBE_SUCCESS);
            });
    });

    it('dispatches failure action when resubscribe fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(resubscribe())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RESUBSCRIBE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RESUBSCRIBE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when resubscribe fails with nonexistent user', () => {
        const store = mockStore({});

        return store.dispatch(resubscribe(999, 1))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RESUBSCRIBE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RESUBSCRIBE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when resubscribe fails with nonexistent tv show', () => {
        const store = mockStore({});

        return store.dispatch(resubscribe(1, 999))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RESUBSCRIBE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RESUBSCRIBE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when resubscribe fails with negative user id', () => {
        const store = mockStore({});

        return store.dispatch(resubscribe(-1, 1))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RESUBSCRIBE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RESUBSCRIBE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when resubscribe fails with negative tv show id', () => {
        const store = mockStore({});

        return store.dispatch(resubscribe(1, -1))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RESUBSCRIBE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RESUBSCRIBE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when resubscribe fails with string', () => {
        const store = mockStore({});

        return store.dispatch(resubscribe('', ''))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RESUBSCRIBE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RESUBSCRIBE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when resubscribe fails with missing argument', () => {
        const store = mockStore({});

        return store.dispatch(resubscribe(1))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RESUBSCRIBE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RESUBSCRIBE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when resubscribe fails', () => {
        const store = mockStore({});

        return store.dispatch(resubscribe({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_RESUBSCRIBE_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_RESUBSCRIBE_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissResubscribeError', () => {
        const expectedAction = {
            type: MEDIA_RESUBSCRIBE_DISMISS_ERROR,
        };
        expect(dismissResubscribeError()).toEqual(expectedAction);
    });

    it('handles action type MEDIA_RESUBSCRIBE_BEGIN correctly', () => {
        const prevState = { resubscribePending: false };
        const state = reducer(
            prevState,
            { type: MEDIA_RESUBSCRIBE_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.resubscribePending).toBe(true);
    });

    it('handles action type MEDIA_RESUBSCRIBE_SUCCESS correctly', () => {
        const prevState = { resubscribePending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_RESUBSCRIBE_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.resubscribePending).toBe(false);
    });

    it('handles action type MEDIA_RESUBSCRIBE_FAILURE correctly', () => {
        const prevState = { resubscribePending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_RESUBSCRIBE_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.resubscribePending).toBe(false);
        expect(state.resubscribeError).toEqual(undefined);
    });

    it('handles action type MEDIA_RESUBSCRIBE_DISMISS_ERROR correctly', () => {
        const prevState = { resubscribeError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: MEDIA_RESUBSCRIBE_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.resubscribeError).toBe(null);
    });
});
