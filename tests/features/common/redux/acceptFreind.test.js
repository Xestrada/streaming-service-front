import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_ACCEPT_FREIND_BEGIN,
  COMMON_ACCEPT_FREIND_SUCCESS,
  COMMON_ACCEPT_FREIND_FAILURE,
  COMMON_ACCEPT_FREIND_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  acceptFreind,
  dismissAcceptFreindError,
  reducer,
} from '../../../../src/features/common/redux/acceptFreind';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/acceptFreind', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when acceptFreind succeeds', () => {
    const store = mockStore({});

    return store.dispatch(acceptFreind())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_ACCEPT_FREIND_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_ACCEPT_FREIND_SUCCESS);
      });
  });

  it('dispatches failure action when acceptFreind fails', () => {
    const store = mockStore({});

    return store.dispatch(acceptFreind({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_ACCEPT_FREIND_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_ACCEPT_FREIND_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAcceptFreindError', () => {
    const expectedAction = {
      type: COMMON_ACCEPT_FREIND_DISMISS_ERROR,
    };
    expect(dismissAcceptFreindError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_ACCEPT_FREIND_BEGIN correctly', () => {
    const prevState = { acceptFreindPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_ACCEPT_FREIND_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.acceptFreindPending).toBe(true);
  });

  it('handles action type COMMON_ACCEPT_FREIND_SUCCESS correctly', () => {
    const prevState = { acceptFreindPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_ACCEPT_FREIND_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.acceptFreindPending).toBe(false);
  });

  it('handles action type COMMON_ACCEPT_FREIND_FAILURE correctly', () => {
    const prevState = { acceptFreindPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_ACCEPT_FREIND_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.acceptFreindPending).toBe(false);
    expect(state.acceptFreindError).toEqual(expect.anything());
  });

  it('handles action type COMMON_ACCEPT_FREIND_DISMISS_ERROR correctly', () => {
    const prevState = { acceptFreindError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_ACCEPT_FREIND_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.acceptFreindError).toBe(null);
  });
});

