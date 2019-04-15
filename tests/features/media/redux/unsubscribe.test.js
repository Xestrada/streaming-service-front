import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MEDIA_UNSUBSCRIBE_BEGIN,
  MEDIA_UNSUBSCRIBE_SUCCESS,
  MEDIA_UNSUBSCRIBE_FAILURE,
  MEDIA_UNSUBSCRIBE_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
  unsubscribe,
  dismissUnsubscribeError,
  reducer,
} from '../../../../src/features/media/redux/unsubscribe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('media/redux/unsubscribe', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when unsubscribe succeeds', () => {
    const store = mockStore({});

    return store.dispatch(unsubscribe())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_UNSUBSCRIBE_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_UNSUBSCRIBE_SUCCESS);
      });
  });

  it('dispatches failure action when unsubscribe fails', () => {
    const store = mockStore({});

    return store.dispatch(unsubscribe({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_UNSUBSCRIBE_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_UNSUBSCRIBE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUnsubscribeError', () => {
    const expectedAction = {
      type: MEDIA_UNSUBSCRIBE_DISMISS_ERROR,
    };
    expect(dismissUnsubscribeError()).toEqual(expectedAction);
  });

  it('handles action type MEDIA_UNSUBSCRIBE_BEGIN correctly', () => {
    const prevState = { unsubscribePending: false };
    const state = reducer(
      prevState,
      { type: MEDIA_UNSUBSCRIBE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.unsubscribePending).toBe(true);
  });

  it('handles action type MEDIA_UNSUBSCRIBE_SUCCESS correctly', () => {
    const prevState = { unsubscribePending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_UNSUBSCRIBE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.unsubscribePending).toBe(false);
  });

  it('handles action type MEDIA_UNSUBSCRIBE_FAILURE correctly', () => {
    const prevState = { unsubscribePending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_UNSUBSCRIBE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.unsubscribePending).toBe(false);
    expect(state.unsubscribeError).toEqual(expect.anything());
  });

  it('handles action type MEDIA_UNSUBSCRIBE_DISMISS_ERROR correctly', () => {
    const prevState = { unsubscribeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MEDIA_UNSUBSCRIBE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.unsubscribeError).toBe(null);
  });
});

