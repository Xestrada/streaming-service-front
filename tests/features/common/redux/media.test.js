import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    COMMON_MEDIA_BEGIN,
    COMMON_MEDIA_SUCCESS,
    COMMON_MEDIA_FAILURE,
    COMMON_MEDIA_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
    getMedia,
    dismissMediaError,
    reducer,
} from '../../../../src/features/common/redux/media';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/media', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches success action when media succeeds with a Movie', () => {
        const store = mockStore({});

        return store.dispatch(getMedia('Bird Box'))
            .then(() => {
                const actions = store.getActions();
                console.log(actions);
                expect(actions[0]).toHaveProperty('type', COMMON_MEDIA_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_MEDIA_SUCCESS);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches success action when media succeeds with a TV Show', () => {
        const store = mockStore({});

        return store.dispatch(getMedia('Seinfeld'))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_MEDIA_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_MEDIA_SUCCESS);
            });
    });

    it('dispatches failure action when media fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(getMedia())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_MEDIA_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_MEDIA_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('dispatches failure action when media fails with value', () => {
        const store = mockStore({});

        return store.dispatch(getMedia())
            .catch(() => {
                const actions = store.getActions(2);
                expect(actions[0]).toHaveProperty('type', COMMON_MEDIA_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_MEDIA_FAILURE);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when media fails with empty string', () => {
        const store = mockStore({});

        return store.dispatch(getMedia(''))
            .catch(() => {
                const actions = store.getActions(2);
                expect(actions[0]).toHaveProperty('type', COMMON_MEDIA_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_MEDIA_FAILURE);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when media fails with nonexistent Movie/TV Show', () => {
        const store = mockStore({});

        return store.dispatch(getMedia('Godzilla'))
            .catch(() => {
                const actions = store.getActions(2);
                expect(actions[0]).toHaveProperty('type', COMMON_MEDIA_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_MEDIA_FAILURE);
                expect(actions[1]).toHaveProperty('data', expect.anything());
            });
    });

    it('dispatches failure action when media fails', () => {
        const store = mockStore({});

        return store.dispatch(getMedia({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', COMMON_MEDIA_BEGIN);
                expect(actions[1]).toHaveProperty('type', COMMON_MEDIA_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissMediaError', () => {
        const expectedAction = {
            type: COMMON_MEDIA_DISMISS_ERROR,
        };
        expect(dismissMediaError()).toEqual(expectedAction);
    });

    it('handles action type COMMON_MEDIA_BEGIN correctly', () => {
        const prevState = { mediaPending: false };
        const state = reducer(
            prevState,
            { type: COMMON_MEDIA_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.mediaPending).toBe(true);
    });

    it('handles action type COMMON_MEDIA_SUCCESS correctly', () => {
        const prevState = { mediaPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_MEDIA_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.mediaPending).toBe(false);
    });

    it('handles action type COMMON_MEDIA_FAILURE correctly', () => {
        const prevState = { mediaPending: true };
        const state = reducer(
            prevState,
            { type: COMMON_MEDIA_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.mediaPending).toBe(false);
        expect(state.mediaError).toEqual(undefined);
    });

    it('handles action type COMMON_MEDIA_DISMISS_ERROR correctly', () => {
        const prevState = { mediaError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: COMMON_MEDIA_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.mediaError).toBe(null);
    });
});
