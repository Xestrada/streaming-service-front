import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PROFILE_CLEAR_USER_PROFILE_BEGIN,
  PROFILE_CLEAR_USER_PROFILE_SUCCESS,
  PROFILE_CLEAR_USER_PROFILE_FAILURE,
  PROFILE_CLEAR_USER_PROFILE_DISMISS_ERROR,
} from '../../../../src/features/profile/redux/constants';

import {
  clearUserProfile,
  dismissClearUserProfileError,
  reducer,
} from '../../../../src/features/profile/redux/clearUserProfile';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('profile/redux/clearUserProfile', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when clearUserProfile succeeds', () => {
    const store = mockStore({});

    return store.dispatch(clearUserProfile())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PROFILE_CLEAR_USER_PROFILE_BEGIN);
        expect(actions[1]).toHaveProperty('type', PROFILE_CLEAR_USER_PROFILE_SUCCESS);
      });
  });

  it('dispatches failure action when clearUserProfile fails', () => {
    const store = mockStore({});

    return store.dispatch(clearUserProfile({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PROFILE_CLEAR_USER_PROFILE_BEGIN);
        expect(actions[1]).toHaveProperty('type', PROFILE_CLEAR_USER_PROFILE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissClearUserProfileError', () => {
    const expectedAction = {
      type: PROFILE_CLEAR_USER_PROFILE_DISMISS_ERROR,
    };
    expect(dismissClearUserProfileError()).toEqual(expectedAction);
  });

  it('handles action type PROFILE_CLEAR_USER_PROFILE_BEGIN correctly', () => {
    const prevState = { clearUserProfilePending: false };
    const state = reducer(
      prevState,
      { type: PROFILE_CLEAR_USER_PROFILE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.clearUserProfilePending).toBe(true);
  });

  it('handles action type PROFILE_CLEAR_USER_PROFILE_SUCCESS correctly', () => {
    const prevState = { clearUserProfilePending: true };
    const state = reducer(
      prevState,
      { type: PROFILE_CLEAR_USER_PROFILE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.clearUserProfilePending).toBe(false);
  });

  it('handles action type PROFILE_CLEAR_USER_PROFILE_FAILURE correctly', () => {
    const prevState = { clearUserProfilePending: true };
    const state = reducer(
      prevState,
      { type: PROFILE_CLEAR_USER_PROFILE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.clearUserProfilePending).toBe(false);
    expect(state.clearUserProfileError).toEqual(expect.anything());
  });

  it('handles action type PROFILE_CLEAR_USER_PROFILE_DISMISS_ERROR correctly', () => {
    const prevState = { clearUserProfileError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PROFILE_CLEAR_USER_PROFILE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.clearUserProfileError).toBe(null);
  });
});

