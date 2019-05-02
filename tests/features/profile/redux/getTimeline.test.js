import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    PROFILE_GET_TIMELINE_BEGIN,
    PROFILE_GET_TIMELINE_SUCCESS,
    PROFILE_GET_TIMELINE_FAILURE,
    PROFILE_GET_TIMELINE_DISMISS_ERROR,
} from '../../../../src/features/profile/redux/constants';

import {
    getTimeline,
    dismissGetTimelineError,
    reducer,
} from '../../../../src/features/profile/redux/getTimeline';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('profile/redux/getTimeline', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when getTimeline  succeeds with id:0', () => {
        const store = mockStore({});

        return store.dispatch(getTimeline(0))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_GET_TIMELINE_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_GET_TIMELINE_FAILURE);
            });
    });

    it('dispatches success action when getTimeline succeeds with id:1', () => {
        const store = mockStore({});

        return store.dispatch(getTimeline(1))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_GET_TIMELINE_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_GET_TIMELINE_SUCCESS);
            });
    });

    it('dispatches success action when getTimeline succeeds with id:2', () => {
        const store = mockStore({});

        return store.dispatch(getTimeline(2))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_GET_TIMELINE_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_GET_TIMELINE_SUCCESS);
            });
    });

    it('dispatches success action when getTimeline succeeds with id:3', () => {
        const store = mockStore({});

        return store.dispatch(getTimeline(3))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_GET_TIMELINE_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_GET_TIMELINE_SUCCESS);
            });
    });

    it('dispatches success action when getTimeline fail with id:4', () => {
        const store = mockStore({});

        return store.dispatch(getTimeline(4))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_GET_TIMELINE_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_GET_TIMELINE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches success action when getTimeline succeeds with id:5', () => {
        const store = mockStore({});

        return store.dispatch(getTimeline(5))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_GET_TIMELINE_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_GET_TIMELINE_SUCCESS);
            });
    });

    it('dispatches failure action when getTimeline fails with empty id', () => {
        const store = mockStore({});

        return store.dispatch(getTimeline())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_GET_TIMELINE_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_GET_TIMELINE_FAILURE);
            });
    });


    it('dispatches failure action when getTimeline fails with negative id', () => {
        const store = mockStore({});

        return store.dispatch(getTimeline(-1))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_GET_TIMELINE_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_GET_TIMELINE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when getTimeline fails with string', () => {
        const store = mockStore({});

        return store.dispatch(getTimeline(''))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_GET_TIMELINE_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_GET_TIMELINE_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when getTimeline fails', () => {
        const store = mockStore({});

        return store.dispatch(getTimeline({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', PROFILE_GET_TIMELINE_BEGIN);
                expect(actions[1]).toHaveProperty('type', PROFILE_GET_TIMELINE_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissGetTimelineError', () => {
        const expectedAction = {
            type: PROFILE_GET_TIMELINE_DISMISS_ERROR,
        };
        expect(dismissGetTimelineError()).toEqual(expectedAction);
    });

    it('handles action type PROFILE_GET_TIMELINE_BEGIN correctly', () => {
        const prevState = { getTimelinePending: false };
        const state = reducer(
            prevState,
            { type: PROFILE_GET_TIMELINE_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getTimelinePending).toBe(true);
    });

    it('handles action type PROFILE_GET_TIMELINE_SUCCESS correctly', () => {
        const prevState = { getTimelinePending: true };
        const state = reducer(
            prevState,
            { type: PROFILE_GET_TIMELINE_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getTimelinePending).toBe(false);
    });

    it('handles action type PROFILE_GET_TIMELINE_FAILURE correctly', () => {
        const prevState = { getTimelinePending: true };
        const state = reducer(
            prevState,
            { type: PROFILE_GET_TIMELINE_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getTimelinePending).toBe(false);
        expect(state.getTimelineError).toEqual(expect.anything());
    });

    it('handles action type PROFILE_GET_TIMELINE_DISMISS_ERROR correctly', () => {
        const prevState = { getTimelineError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: PROFILE_GET_TIMELINE_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.getTimelineError).toBe(null);
    });
});
