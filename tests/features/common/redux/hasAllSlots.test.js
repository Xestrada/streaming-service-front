import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_HAS_ALL_SLOTS_BEGIN,
  COMMON_HAS_ALL_SLOTS_SUCCESS,
  COMMON_HAS_ALL_SLOTS_FAILURE,
  COMMON_HAS_ALL_SLOTS_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  hasAllSlots,
  dismissHasAllSlotsError,
  reducer,
} from '../../../../src/features/common/redux/hasAllSlots';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/hasAllSlots', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when hasAllSlots succeeds', () => {
    const store = mockStore({});

    return store.dispatch(hasAllSlots())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_HAS_ALL_SLOTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_HAS_ALL_SLOTS_SUCCESS);
      });
  });

  it('dispatches failure action when hasAllSlots fails', () => {
    const store = mockStore({});

    return store.dispatch(hasAllSlots({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_HAS_ALL_SLOTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_HAS_ALL_SLOTS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissHasAllSlotsError', () => {
    const expectedAction = {
      type: COMMON_HAS_ALL_SLOTS_DISMISS_ERROR,
    };
    expect(dismissHasAllSlotsError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_HAS_ALL_SLOTS_BEGIN correctly', () => {
    const prevState = { hasAllSlotsPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_HAS_ALL_SLOTS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.hasAllSlotsPending).toBe(true);
  });

  it('handles action type COMMON_HAS_ALL_SLOTS_SUCCESS correctly', () => {
    const prevState = { hasAllSlotsPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_HAS_ALL_SLOTS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.hasAllSlotsPending).toBe(false);
  });

  it('handles action type COMMON_HAS_ALL_SLOTS_FAILURE correctly', () => {
    const prevState = { hasAllSlotsPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_HAS_ALL_SLOTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.hasAllSlotsPending).toBe(false);
    expect(state.hasAllSlotsError).toEqual(expect.anything());
  });

  it('handles action type COMMON_HAS_ALL_SLOTS_DISMISS_ERROR correctly', () => {
    const prevState = { hasAllSlotsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_HAS_ALL_SLOTS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.hasAllSlotsError).toBe(null);
  });
});

