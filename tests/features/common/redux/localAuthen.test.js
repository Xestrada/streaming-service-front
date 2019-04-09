import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_LOCAL_AUTHEN_BEGIN,
  COMMON_LOCAL_AUTHEN_SUCCESS,
  COMMON_LOCAL_AUTHEN_FAILURE,
  COMMON_LOCAL_AUTHEN_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  localAuthen,
  dismissLocalAuthenError,
  reducer,
} from '../../../../src/features/common/redux/localAuthen';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/localAuthen', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when localAuthen succeeds', () => {
    const store = mockStore({});

    return store.dispatch(localAuthen())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_LOCAL_AUTHEN_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_LOCAL_AUTHEN_SUCCESS);
      });
  });

  it('dispatches failure action when localAuthen fails', () => {
    const store = mockStore({});

    return store.dispatch(localAuthen({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_LOCAL_AUTHEN_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_LOCAL_AUTHEN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLocalAuthenError', () => {
    const expectedAction = {
      type: COMMON_LOCAL_AUTHEN_DISMISS_ERROR,
    };
    expect(dismissLocalAuthenError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_LOCAL_AUTHEN_BEGIN correctly', () => {
    const prevState = { localAuthenPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_LOCAL_AUTHEN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.localAuthenPending).toBe(true);
  });

  it('handles action type COMMON_LOCAL_AUTHEN_SUCCESS correctly', () => {
    const prevState = { localAuthenPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_LOCAL_AUTHEN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.localAuthenPending).toBe(false);
  });

  it('handles action type COMMON_LOCAL_AUTHEN_FAILURE correctly', () => {
    const prevState = { localAuthenPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_LOCAL_AUTHEN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.localAuthenPending).toBe(false);
    expect(state.localAuthenError).toEqual(expect.anything());
  });

  it('handles action type COMMON_LOCAL_AUTHEN_DISMISS_ERROR correctly', () => {
    const prevState = { localAuthenError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_LOCAL_AUTHEN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.localAuthenError).toBe(null);
  });
});

