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

describe('media/redux/deleteSlot', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteSlot succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteSlot())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_DELETE_SLOT_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_DELETE_SLOT_SUCCESS);
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
      { type: MEDIA_DELETE_SLOT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteSlotPending).toBe(true);
  });

  it('handles action type MEDIA_DELETE_SLOT_SUCCESS correctly', () => {
    const prevState = { deleteSlotPending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_DELETE_SLOT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteSlotPending).toBe(false);
  });

  it('handles action type MEDIA_DELETE_SLOT_FAILURE correctly', () => {
    const prevState = { deleteSlotPending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_DELETE_SLOT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteSlotPending).toBe(false);
    expect(state.deleteSlotError).toEqual(expect.anything());
  });

  it('handles action type MEDIA_DELETE_SLOT_DISMISS_ERROR correctly', () => {
    const prevState = { deleteSlotError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MEDIA_DELETE_SLOT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteSlotError).toBe(null);
  });
});

