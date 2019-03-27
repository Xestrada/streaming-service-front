import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_ADD_SLOT_BEGIN,
  COMMON_ADD_SLOT_SUCCESS,
  COMMON_ADD_SLOT_FAILURE,
  COMMON_ADD_SLOT_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  addSlot,
  dismissAddSlotError,
  reducer,
} from '../../../../src/features/common/redux/addSlot';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/addSlot', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addSlot succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addSlot())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_ADD_SLOT_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_ADD_SLOT_SUCCESS);
      });
  });

  it('dispatches failure action when addSlot fails', () => {
    const store = mockStore({});

    return store.dispatch(addSlot({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_ADD_SLOT_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_ADD_SLOT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddSlotError', () => {
    const expectedAction = {
      type: COMMON_ADD_SLOT_DISMISS_ERROR,
    };
    expect(dismissAddSlotError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_ADD_SLOT_BEGIN correctly', () => {
    const prevState = { addSlotPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_ADD_SLOT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addSlotPending).toBe(true);
  });

  it('handles action type COMMON_ADD_SLOT_SUCCESS correctly', () => {
    const prevState = { addSlotPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_ADD_SLOT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addSlotPending).toBe(false);
  });

  it('handles action type COMMON_ADD_SLOT_FAILURE correctly', () => {
    const prevState = { addSlotPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_ADD_SLOT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addSlotPending).toBe(false);
    expect(state.addSlotError).toEqual(expect.anything());
  });

  it('handles action type COMMON_ADD_SLOT_DISMISS_ERROR correctly', () => {
    const prevState = { addSlotError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_ADD_SLOT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addSlotError).toBe(null);
  });
});

