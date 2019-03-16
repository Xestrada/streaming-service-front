import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_AUTHEN_BEGIN,
  COMMON_AUTHEN_SUCCESS,
  COMMON_AUTHEN_FAILURE,
  COMMON_AUTHEN_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  authen,
  dismissAuthenError,
  reducer,
} from '../../../../src/features/common/redux/authen';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/authen', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when authen succeeds', () => {
    const store = mockStore({});

    return store.dispatch(authen())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_AUTHEN_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_AUTHEN_SUCCESS);
      });
  });

  it('dispatches failure action when authen fails', () => {
    const store = mockStore({});

    return store.dispatch(authen({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_AUTHEN_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_AUTHEN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAuthenError', () => {
    const expectedAction = {
      type: COMMON_AUTHEN_DISMISS_ERROR,
    };
    expect(dismissAuthenError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_AUTHEN_BEGIN correctly', () => {
    const prevState = { authenPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_AUTHEN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.authenPending).toBe(true);
  });

  it('handles action type COMMON_AUTHEN_SUCCESS correctly', () => {
    const prevState = { authenPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_AUTHEN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.authenPending).toBe(false);
  });

  it('handles action type COMMON_AUTHEN_FAILURE correctly', () => {
    const prevState = { authenPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_AUTHEN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.authenPending).toBe(false);
    expect(state.authenError).toEqual(expect.anything());
  });

  it('handles action type COMMON_AUTHEN_DISMISS_ERROR correctly', () => {
    const prevState = { authenError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_AUTHEN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.authenError).toBe(null);
  });
});

