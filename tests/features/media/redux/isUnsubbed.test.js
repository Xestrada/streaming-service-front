import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MEDIA_IS_UNSUBBED_BEGIN,
  MEDIA_IS_UNSUBBED_SUCCESS,
  MEDIA_IS_UNSUBBED_FAILURE,
  MEDIA_IS_UNSUBBED_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
  isUnsubbed,
  dismissIsUnsubbedError,
  reducer,
} from '../../../../src/features/media/redux/isUnsubbed';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('media/redux/isUnsubbed', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when isUnsubbed succeeds', () => {
    const store = mockStore({});

    return store.dispatch(isUnsubbed())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_IS_UNSUBBED_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_IS_UNSUBBED_SUCCESS);
      });
  });

  it('dispatches failure action when isUnsubbed fails', () => {
    const store = mockStore({});

    return store.dispatch(isUnsubbed({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_IS_UNSUBBED_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_IS_UNSUBBED_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissIsUnsubbedError', () => {
    const expectedAction = {
      type: MEDIA_IS_UNSUBBED_DISMISS_ERROR,
    };
    expect(dismissIsUnsubbedError()).toEqual(expectedAction);
  });

  it('handles action type MEDIA_IS_UNSUBBED_BEGIN correctly', () => {
    const prevState = { isUnsubbedPending: false };
    const state = reducer(
      prevState,
      { type: MEDIA_IS_UNSUBBED_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isUnsubbedPending).toBe(true);
  });

  it('handles action type MEDIA_IS_UNSUBBED_SUCCESS correctly', () => {
    const prevState = { isUnsubbedPending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_IS_UNSUBBED_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isUnsubbedPending).toBe(false);
  });

  it('handles action type MEDIA_IS_UNSUBBED_FAILURE correctly', () => {
    const prevState = { isUnsubbedPending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_IS_UNSUBBED_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isUnsubbedPending).toBe(false);
    expect(state.isUnsubbedError).toEqual(expect.anything());
  });

  it('handles action type MEDIA_IS_UNSUBBED_DISMISS_ERROR correctly', () => {
    const prevState = { isUnsubbedError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MEDIA_IS_UNSUBBED_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isUnsubbedError).toBe(null);
  });
});

