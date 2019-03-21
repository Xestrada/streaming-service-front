import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_SIGNUP_BEGIN,
  COMMON_SIGNUP_SUCCESS,
  COMMON_SIGNUP_FAILURE,
  COMMON_SIGNUP_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  signup,
  dismissSignupError,
  reducer,
} from '../../../../src/features/common/redux/signup';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/signup', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when signup succeeds', () => {
    const store = mockStore({});

    return store.dispatch(signup())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_SIGNUP_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_SIGNUP_SUCCESS);
      });
  });

  it('dispatches failure action when signup fails', () => {
    const store = mockStore({});

    return store.dispatch(signup({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_SIGNUP_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_SIGNUP_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSignupError', () => {
    const expectedAction = {
      type: COMMON_SIGNUP_DISMISS_ERROR,
    };
    expect(dismissSignupError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_SIGNUP_BEGIN correctly', () => {
    const prevState = { signupPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_SIGNUP_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signupPending).toBe(true);
  });

  it('handles action type COMMON_SIGNUP_SUCCESS correctly', () => {
    const prevState = { signupPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_SIGNUP_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signupPending).toBe(false);
  });

  it('handles action type COMMON_SIGNUP_FAILURE correctly', () => {
    const prevState = { signupPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_SIGNUP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signupPending).toBe(false);
    expect(state.signupError).toEqual(expect.anything());
  });

  it('handles action type COMMON_SIGNUP_DISMISS_ERROR correctly', () => {
    const prevState = { signupError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_SIGNUP_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signupError).toBe(null);
  });
});

