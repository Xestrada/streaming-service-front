import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_ADD_FRIEND_BEGIN,
  COMMON_ADD_FRIEND_SUCCESS,
  COMMON_ADD_FRIEND_FAILURE,
  COMMON_ADD_FRIEND_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  addFriend,
  dismissAddFriendError,
  reducer,
} from '../../../../src/features/common/redux/addFriend';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/addFriend', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addFriend succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addFriend())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_ADD_FRIEND_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_ADD_FRIEND_SUCCESS);
      });
  });

  it('dispatches failure action when addFriend fails', () => {
    const store = mockStore({});

    return store.dispatch(addFriend({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_ADD_FRIEND_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_ADD_FRIEND_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddFriendError', () => {
    const expectedAction = {
      type: COMMON_ADD_FRIEND_DISMISS_ERROR,
    };
    expect(dismissAddFriendError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_ADD_FRIEND_BEGIN correctly', () => {
    const prevState = { addFriendPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_ADD_FRIEND_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addFriendPending).toBe(true);
  });

  it('handles action type COMMON_ADD_FRIEND_SUCCESS correctly', () => {
    const prevState = { addFriendPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_ADD_FRIEND_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addFriendPending).toBe(false);
  });

  it('handles action type COMMON_ADD_FRIEND_FAILURE correctly', () => {
    const prevState = { addFriendPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_ADD_FRIEND_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addFriendPending).toBe(false);
    expect(state.addFriendError).toEqual(expect.anything());
  });

  it('handles action type COMMON_ADD_FRIEND_DISMISS_ERROR correctly', () => {
    const prevState = { addFriendError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_ADD_FRIEND_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addFriendError).toBe(null);
  });
});

