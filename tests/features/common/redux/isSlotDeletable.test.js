import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_IS_SLOT_DELETABLE_BEGIN,
  COMMON_IS_SLOT_DELETABLE_SUCCESS,
  COMMON_IS_SLOT_DELETABLE_FAILURE,
  COMMON_IS_SLOT_DELETABLE_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  isSlotDeletable,
  dismissIsSlotDeletableError,
  reducer,
} from '../../../../src/features/common/redux/isSlotDeletable';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/isSlotDeletable', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when isSlotDeletable succeeds', () => {
    const store = mockStore({});

    return store.dispatch(isSlotDeletable())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_IS_SLOT_DELETABLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_IS_SLOT_DELETABLE_SUCCESS);
      });
  });

  it('dispatches failure action when isSlotDeletable fails', () => {
    const store = mockStore({});

    return store.dispatch(isSlotDeletable({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_IS_SLOT_DELETABLE_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_IS_SLOT_DELETABLE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissIsSlotDeletableError', () => {
    const expectedAction = {
      type: COMMON_IS_SLOT_DELETABLE_DISMISS_ERROR,
    };
    expect(dismissIsSlotDeletableError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_IS_SLOT_DELETABLE_BEGIN correctly', () => {
    const prevState = { isSlotDeletablePending: false };
    const state = reducer(
      prevState,
      { type: COMMON_IS_SLOT_DELETABLE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isSlotDeletablePending).toBe(true);
  });

  it('handles action type COMMON_IS_SLOT_DELETABLE_SUCCESS correctly', () => {
    const prevState = { isSlotDeletablePending: true };
    const state = reducer(
      prevState,
      { type: COMMON_IS_SLOT_DELETABLE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isSlotDeletablePending).toBe(false);
  });

  it('handles action type COMMON_IS_SLOT_DELETABLE_FAILURE correctly', () => {
    const prevState = { isSlotDeletablePending: true };
    const state = reducer(
      prevState,
      { type: COMMON_IS_SLOT_DELETABLE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isSlotDeletablePending).toBe(false);
    expect(state.isSlotDeletableError).toEqual(expect.anything());
  });

  it('handles action type COMMON_IS_SLOT_DELETABLE_DISMISS_ERROR correctly', () => {
    const prevState = { isSlotDeletableError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_IS_SLOT_DELETABLE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isSlotDeletableError).toBe(null);
  });
});

