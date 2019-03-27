import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_ADD_INITIAL_SUBS_BEGIN,
  COMMON_ADD_INITIAL_SUBS_SUCCESS,
  COMMON_ADD_INITIAL_SUBS_FAILURE,
  COMMON_ADD_INITIAL_SUBS_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  addInitialSubs,
  dismissAddInitialSubsError,
  reducer,
} from '../../../../src/features/common/redux/addInitialSubs';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/addInitialSubs', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addInitialSubs succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addInitialSubs())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_ADD_INITIAL_SUBS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_ADD_INITIAL_SUBS_SUCCESS);
      });
  });

  it('dispatches failure action when addInitialSubs fails', () => {
    const store = mockStore({});

    return store.dispatch(addInitialSubs({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_ADD_INITIAL_SUBS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_ADD_INITIAL_SUBS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddInitialSubsError', () => {
    const expectedAction = {
      type: COMMON_ADD_INITIAL_SUBS_DISMISS_ERROR,
    };
    expect(dismissAddInitialSubsError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_ADD_INITIAL_SUBS_BEGIN correctly', () => {
    const prevState = { addInitialSubsPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_ADD_INITIAL_SUBS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addInitialSubsPending).toBe(true);
  });

  it('handles action type COMMON_ADD_INITIAL_SUBS_SUCCESS correctly', () => {
    const prevState = { addInitialSubsPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_ADD_INITIAL_SUBS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addInitialSubsPending).toBe(false);
  });

  it('handles action type COMMON_ADD_INITIAL_SUBS_FAILURE correctly', () => {
    const prevState = { addInitialSubsPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_ADD_INITIAL_SUBS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addInitialSubsPending).toBe(false);
    expect(state.addInitialSubsError).toEqual(expect.anything());
  });

  it('handles action type COMMON_ADD_INITIAL_SUBS_DISMISS_ERROR correctly', () => {
    const prevState = { addInitialSubsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_ADD_INITIAL_SUBS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addInitialSubsError).toBe(null);
  });
});

