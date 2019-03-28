import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MEDIA_IS_MEDIA_OWNED_BEGIN,
  MEDIA_IS_MEDIA_OWNED_SUCCESS,
  MEDIA_IS_MEDIA_OWNED_FAILURE,
  MEDIA_IS_MEDIA_OWNED_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
  isMediaOwned,
  dismissIsMediaOwnedError,
  reducer,
} from '../../../../src/features/media/redux/isMediaOwned';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('media/redux/isMediaOwned', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when isMediaOwned succeeds', () => {
    const store = mockStore({});

    return store.dispatch(isMediaOwned())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_IS_MEDIA_OWNED_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_IS_MEDIA_OWNED_SUCCESS);
      });
  });

  it('dispatches failure action when isMediaOwned fails', () => {
    const store = mockStore({});

    return store.dispatch(isMediaOwned({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_IS_MEDIA_OWNED_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_IS_MEDIA_OWNED_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissIsMediaOwnedError', () => {
    const expectedAction = {
      type: MEDIA_IS_MEDIA_OWNED_DISMISS_ERROR,
    };
    expect(dismissIsMediaOwnedError()).toEqual(expectedAction);
  });

  it('handles action type MEDIA_IS_MEDIA_OWNED_BEGIN correctly', () => {
    const prevState = { isMediaOwnedPending: false };
    const state = reducer(
      prevState,
      { type: MEDIA_IS_MEDIA_OWNED_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isMediaOwnedPending).toBe(true);
  });

  it('handles action type MEDIA_IS_MEDIA_OWNED_SUCCESS correctly', () => {
    const prevState = { isMediaOwnedPending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_IS_MEDIA_OWNED_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isMediaOwnedPending).toBe(false);
  });

  it('handles action type MEDIA_IS_MEDIA_OWNED_FAILURE correctly', () => {
    const prevState = { isMediaOwnedPending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_IS_MEDIA_OWNED_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isMediaOwnedPending).toBe(false);
    expect(state.isMediaOwnedError).toEqual(expect.anything());
  });

  it('handles action type MEDIA_IS_MEDIA_OWNED_DISMISS_ERROR correctly', () => {
    const prevState = { isMediaOwnedError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MEDIA_IS_MEDIA_OWNED_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.isMediaOwnedError).toBe(null);
  });
});

