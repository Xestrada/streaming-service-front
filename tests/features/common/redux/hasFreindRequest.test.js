import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_HAS_FREIND_REQUEST_BEGIN,
  COMMON_HAS_FREIND_REQUEST_SUCCESS,
  COMMON_HAS_FREIND_REQUEST_FAILURE,
  COMMON_HAS_FREIND_REQUEST_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  hasFreindRequest,
  dismissHasFreindRequestError,
  reducer,
} from '../../../../src/features/common/redux/hasFreindRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/hasFreindRequest', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when hasFreindRequest succeeds', () => {
    const store = mockStore({});

    return store.dispatch(hasFreindRequest())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_HAS_FREIND_REQUEST_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_HAS_FREIND_REQUEST_SUCCESS);
      });
  });

  it('dispatches failure action when hasFreindRequest fails', () => {
    const store = mockStore({});

    return store.dispatch(hasFreindRequest({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_HAS_FREIND_REQUEST_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_HAS_FREIND_REQUEST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissHasFreindRequestError', () => {
    const expectedAction = {
      type: COMMON_HAS_FREIND_REQUEST_DISMISS_ERROR,
    };
    expect(dismissHasFreindRequestError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_HAS_FREIND_REQUEST_BEGIN correctly', () => {
    const prevState = { hasFreindRequestPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_HAS_FREIND_REQUEST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.hasFreindRequestPending).toBe(true);
  });

  it('handles action type COMMON_HAS_FREIND_REQUEST_SUCCESS correctly', () => {
    const prevState = { hasFreindRequestPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_HAS_FREIND_REQUEST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.hasFreindRequestPending).toBe(false);
  });

  it('handles action type COMMON_HAS_FREIND_REQUEST_FAILURE correctly', () => {
    const prevState = { hasFreindRequestPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_HAS_FREIND_REQUEST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.hasFreindRequestPending).toBe(false);
    expect(state.hasFreindRequestError).toEqual(expect.anything());
  });

  it('handles action type COMMON_HAS_FREIND_REQUEST_DISMISS_ERROR correctly', () => {
    const prevState = { hasFreindRequestError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_HAS_FREIND_REQUEST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.hasFreindRequestError).toBe(null);
  });
});

