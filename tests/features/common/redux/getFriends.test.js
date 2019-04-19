import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_GET_FRIENDS_BEGIN,
  COMMON_GET_FRIENDS_SUCCESS,
  COMMON_GET_FRIENDS_FAILURE,
  COMMON_GET_FRIENDS_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  getFriends,
  dismissGetFriendsError,
  reducer,
} from '../../../../src/features/common/redux/getFriends';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/getFriends', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getFriends succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getFriends(0))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_GET_FRIENDS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_GET_FRIENDS_SUCCESS);
        expect(actions[1]).toHaveProperty('data', expect.anything());
      });
  });

  it('dispatches success action when getFriends fails with empty data', () => {
    const store = mockStore({});

    return store.dispatch(getFriends())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_GET_FRIENDS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_GET_FRIENDS_FAILURE);
        expect(actions[1]).toHaveProperty('error', expect.anything());
      });
  });

  it('dispatches success action when getFriends fails with negative id', () => {
    const store = mockStore({});

    return store.dispatch(getFriends(-1))
      .then(() => {
        const actions = store.getActions();
        console.log(actions);
        expect(actions[0]).toHaveProperty('type', COMMON_GET_FRIENDS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_GET_FRIENDS_FAILURE);
        expect(actions[1]).toHaveProperty('error', expect.anything());
      });
  });

  it('dispatches failure action when getFriends fails', () => {
    const store = mockStore({});

    return store.dispatch(getFriends({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_GET_FRIENDS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_GET_FRIENDS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetFriendsError', () => {
    const expectedAction = {
      type: COMMON_GET_FRIENDS_DISMISS_ERROR,
    };
    expect(dismissGetFriendsError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_GET_FRIENDS_BEGIN correctly', () => {
    const prevState = { getFriendsPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_GET_FRIENDS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFriendsPending).toBe(true);
  });

  it('handles action type COMMON_GET_FRIENDS_SUCCESS correctly', () => {
    const prevState = { getFriendsPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_GET_FRIENDS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFriendsPending).toBe(false);
  });

  it('handles action type COMMON_GET_FRIENDS_FAILURE correctly', () => {
    const prevState = { getFriendsPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_GET_FRIENDS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFriendsPending).toBe(false);
    expect(state.getFriendsError).toEqual(undefined);
  });

  it('handles action type COMMON_GET_FRIENDS_DISMISS_ERROR correctly', () => {
    const prevState = { getFriendsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_GET_FRIENDS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFriendsError).toBe(null);
  });
});

