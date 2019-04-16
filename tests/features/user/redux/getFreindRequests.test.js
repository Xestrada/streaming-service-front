import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  USER_GET_FREIND_REQUESTS_BEGIN,
  USER_GET_FREIND_REQUESTS_SUCCESS,
  USER_GET_FREIND_REQUESTS_FAILURE,
  USER_GET_FREIND_REQUESTS_DISMISS_ERROR,
} from '../../../../src/features/user/redux/constants';

import {
  getFreindRequests,
  dismissGetFreindRequestsError,
  reducer,
} from '../../../../src/features/user/redux/getFreindRequests';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user/redux/getFreindRequests', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getFreindRequests succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getFreindRequests())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USER_GET_FREIND_REQUESTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', USER_GET_FREIND_REQUESTS_SUCCESS);
      });
  });

  it('dispatches failure action when getFreindRequests fails', () => {
    const store = mockStore({});

    return store.dispatch(getFreindRequests({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USER_GET_FREIND_REQUESTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', USER_GET_FREIND_REQUESTS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetFreindRequestsError', () => {
    const expectedAction = {
      type: USER_GET_FREIND_REQUESTS_DISMISS_ERROR,
    };
    expect(dismissGetFreindRequestsError()).toEqual(expectedAction);
  });

  it('handles action type USER_GET_FREIND_REQUESTS_BEGIN correctly', () => {
    const prevState = { getFreindRequestsPending: false };
    const state = reducer(
      prevState,
      { type: USER_GET_FREIND_REQUESTS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFreindRequestsPending).toBe(true);
  });

  it('handles action type USER_GET_FREIND_REQUESTS_SUCCESS correctly', () => {
    const prevState = { getFreindRequestsPending: true };
    const state = reducer(
      prevState,
      { type: USER_GET_FREIND_REQUESTS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFreindRequestsPending).toBe(false);
  });

  it('handles action type USER_GET_FREIND_REQUESTS_FAILURE correctly', () => {
    const prevState = { getFreindRequestsPending: true };
    const state = reducer(
      prevState,
      { type: USER_GET_FREIND_REQUESTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFreindRequestsPending).toBe(false);
    expect(state.getFreindRequestsError).toEqual(expect.anything());
  });

  it('handles action type USER_GET_FREIND_REQUESTS_DISMISS_ERROR correctly', () => {
    const prevState = { getFreindRequestsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: USER_GET_FREIND_REQUESTS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFreindRequestsError).toBe(null);
  });
});

