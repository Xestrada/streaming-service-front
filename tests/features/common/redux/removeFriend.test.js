import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_REMOVE_FRIEND_BEGIN,
  COMMON_REMOVE_FRIEND_SUCCESS,
  COMMON_REMOVE_FRIEND_FAILURE,
  COMMON_REMOVE_FRIEND_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  removeFriend,
  dismissRemoveFriendError,
  reducer,
} from '../../../../src/features/common/redux/removeFriend';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/removeFriend', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when removeFriend succeeds', () => {
    const store = mockStore({});

    return store.dispatch(removeFriend())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_REMOVE_FRIEND_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_REMOVE_FRIEND_SUCCESS);
      });
  });

  it('dispatches failure action when removeFriend fails', () => {
    const store = mockStore({});

    return store.dispatch(removeFriend({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_REMOVE_FRIEND_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_REMOVE_FRIEND_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRemoveFriendError', () => {
    const expectedAction = {
      type: COMMON_REMOVE_FRIEND_DISMISS_ERROR,
    };
    expect(dismissRemoveFriendError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_REMOVE_FRIEND_BEGIN correctly', () => {
    const prevState = { removeFriendPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_REMOVE_FRIEND_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.removeFriendPending).toBe(true);
  });

  it('handles action type COMMON_REMOVE_FRIEND_SUCCESS correctly', () => {
    const prevState = { removeFriendPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_REMOVE_FRIEND_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.removeFriendPending).toBe(false);
  });

  it('handles action type COMMON_REMOVE_FRIEND_FAILURE correctly', () => {
    const prevState = { removeFriendPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_REMOVE_FRIEND_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.removeFriendPending).toBe(false);
    expect(state.removeFriendError).toEqual(expect.anything());
  });

  it('handles action type COMMON_REMOVE_FRIEND_DISMISS_ERROR correctly', () => {
    const prevState = { removeFriendError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_REMOVE_FRIEND_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.removeFriendError).toBe(null);
  });
});

