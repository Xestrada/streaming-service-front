import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    COMMON_DECLINE_REQUEST_BEGIN,
    COMMON_DECLINE_REQUEST_SUCCESS,
    COMMON_DECLINE_REQUEST_FAILURE,
    COMMON_DECLINE_REQUEST_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
    declineRequest,
    dismissDeclineRequestError,
    reducer,
} from '../../../../src/features/common/redux/declineRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const myInfo = { user_id: 2, pending_from_id: 3 };
const noRequest = { user_id: 1, pending_from_id: 1 };
const missingArgu = { user_id: 1 };
const emptyInfo = {};

describe('common/redux/declineRequest', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    function success() {
        return {
            type: COMMON_DECLINE_REQUEST_SUCCESS,
        };
    }
    function fetchData() {
        return dispatch => fetch('https://videovaultusers.herokuapp.com/decline_friend_request') // Some async action with promise
            .then(() => dispatch(success()));
    }

    it('dispatches success action when declineRequest succeeds', () => {
        const store = mockStore({});

        return store.dispatch(fetchData())
            .then(() => {
                const actions = store.getActions();
                console.log(actions);
                expect(actions[0]).toHaveProperty('type', COMMON_DECLINE_REQUEST_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DECLINE_REQUEST_SUCCESS);
            });
    });

    it('dispatches failure action when declineRequest fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(declineRequest())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_DECLINE_REQUEST_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DECLINE_REQUEST_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when declineRequest fails with no request', () => {
        const store = mockStore({});

        return store.dispatch(declineRequest(noRequest))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_DECLINE_REQUEST_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DECLINE_REQUEST_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when declineRequest fails with missing arguments', () => {
        const store = mockStore({});

        return store.dispatch(declineRequest(missingArgu))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_DECLINE_REQUEST_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DECLINE_REQUEST_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when declineRequest fails with empty info', () => {
        const store = mockStore({});

        return store.dispatch(declineRequest(emptyInfo))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_DECLINE_REQUEST_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DECLINE_REQUEST_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });
    it('dispatches failure action when declineRequest fails', () => {
        const store = mockStore({});

        return store.dispatch(declineRequest({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_DECLINE_REQUEST_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_DECLINE_REQUEST_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissDeclineRequestError', () => {
        const expectedAction = {
            type: COMMON_DECLINE_REQUEST_DISMISS_ERROR,
        };
        expect(dismissDeclineRequestError()).toEqual(expectedAction);
    });

    it('handles action type COMMON_DECLINE_REQUEST_BEGIN correctly', () => {
        const prevState = { declineRequestPending: false };
        const state = reducer(
            prevState,
            { type: COMMON_DECLINE_REQUEST_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.declineRequestPending).toBe(true);
    });

    it('handles action type COMMON_DECLINE_REQUEST_SUCCESS correctly', () => {
        const prevState = { declineRequestPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_DECLINE_REQUEST_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.declineRequestPending).toBe(false);
    });

    it('handles action type COMMON_DECLINE_REQUEST_FAILURE correctly', () => {
        const prevState = { declineRequestPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_DECLINE_REQUEST_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.declineRequestPending).toBe(false);
        expect(state.declineRequestError).toEqual(undefined);
    });

    it('handles action type COMMON_DECLINE_REQUEST_DISMISS_ERROR correctly', () => {
        const prevState = { declineRequestError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: COMMON_DECLINE_REQUEST_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.declineRequestError).toBe(null);
    });
});
