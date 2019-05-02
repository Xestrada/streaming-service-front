import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    MEDIA_DELETE_SLOT_BEGIN,
    MEDIA_DELETE_SLOT_SUCCESS,
    MEDIA_DELETE_SLOT_FAILURE,
    MEDIA_DELETE_SLOT_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
    deleteSlot,
    dismissDeleteSlotError,
    reducer,
} from '../../../../src/features/media/redux/deleteSlot';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const notExistUser = { user_id: 999, slot_id: 1 };
const notExistSlot = { user_id: 6, slot_id: 999 };
const missingArgu = { user_id: 1 };
const emptyInfo = {};

describe('media/redux/deleteSlot', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('dispatches failure action when deleteSlot fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(deleteSlot())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_DELETE_SLOT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_DELETE_SLOT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when deleteSlot fails with nonexistent slot', () => {
        const store = mockStore({});

        return store.dispatch(deleteSlot(notExistSlot))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_DELETE_SLOT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_DELETE_SLOT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when deleteSlot fails with nonexistent user', () => {
        const store = mockStore({});

        return store.dispatch(deleteSlot(notExistUser))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_DELETE_SLOT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_DELETE_SLOT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });


    it('dispatches failure action when deleteSlot fails with missing arguments', () => {
        const store = mockStore({});

        return store.dispatch(deleteSlot(missingArgu))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_DELETE_SLOT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_DELETE_SLOT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when deleteSlot fails with empty info', () => {
        const store = mockStore({});

        return store.dispatch(deleteSlot(emptyInfo))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_DELETE_SLOT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_DELETE_SLOT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when deleteSlot fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(deleteSlot())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_DELETE_SLOT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_DELETE_SLOT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });

    it('dispatches failure action when deleteSlot fails with empty parameter', () => {
        const store = mockStore({});

        return store.dispatch(deleteSlot())
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_DELETE_SLOT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_DELETE_SLOT_FAILURE);
                expect(actions[1]).toHaveProperty('error', expect.anything());
            });
    });
    it('dispatches failure action when deleteSlot fails', () => {
        const store = mockStore({});

        return store.dispatch(deleteSlot({ error: true }))
            .catch(() => {
                const actions = store.getActions();
                expect(actions[0]).toHaveProperty('type', MEDIA_DELETE_SLOT_BEGIN);
                expect(actions[1]).toHaveProperty('type', MEDIA_DELETE_SLOT_FAILURE);
                expect(actions[1]).toHaveProperty('data.error', expect.anything());
            });
    });

    it('returns correct action by dismissDeleteSlotError', () => {
        const expectedAction = {
            type: MEDIA_DELETE_SLOT_DISMISS_ERROR,
        };
        expect(dismissDeleteSlotError()).toEqual(expectedAction);
    });

    it('handles action type MEDIA_DELETE_SLOT_BEGIN correctly', () => {
        const prevState = { deleteSlotPending: false };
        const state = reducer(
            prevState,
            { type: MEDIA_DELETE_SLOT_BEGIN },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.deleteSlotPending).toBe(true);
    });

    it('handles action type MEDIA_DELETE_SLOT_SUCCESS correctly', () => {
        const prevState = { deleteSlotPending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_DELETE_SLOT_SUCCESS, data: {} },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.deleteSlotPending).toBe(false);
    });

    it('handles action type MEDIA_DELETE_SLOT_FAILURE correctly', () => {
        const prevState = { deleteSlotPending: true };
        const state = reducer(
            prevState,
            { type: MEDIA_DELETE_SLOT_FAILURE, data: { error: new Error('some error') } },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.deleteSlotPending).toBe(false);
        expect(state.deleteSlotError).toEqual(undefined);
    });

    it('handles action type MEDIA_DELETE_SLOT_DISMISS_ERROR correctly', () => {
        const prevState = { deleteSlotError: new Error('some error') };
        const state = reducer(
            prevState,
            { type: MEDIA_DELETE_SLOT_DISMISS_ERROR },
        );
        expect(state).not.toBe(prevState); // should be immutable
        expect(state.deleteSlotError).toBe(null);
    });
});
