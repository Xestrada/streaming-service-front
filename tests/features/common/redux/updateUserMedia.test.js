import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_UPDATE_USER_MEDIA_BEGIN,
  COMMON_UPDATE_USER_MEDIA_SUCCESS,
  COMMON_UPDATE_USER_MEDIA_FAILURE,
  COMMON_UPDATE_USER_MEDIA_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  updateUserMedia,
  dismissUpdateUserMediaError,
  reducer,
} from '../../../../src/features/common/redux/updateUserMedia';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/updateUserMedia', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateUserMedia succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateUserMedia())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_UPDATE_USER_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_UPDATE_USER_MEDIA_SUCCESS);
      });
  });

  it('dispatches failure action when updateUserMedia fails', () => {
    const store = mockStore({});

    return store.dispatch(updateUserMedia({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_UPDATE_USER_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_UPDATE_USER_MEDIA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUpdateUserMediaError', () => {
    const expectedAction = {
      type: COMMON_UPDATE_USER_MEDIA_DISMISS_ERROR,
    };
    expect(dismissUpdateUserMediaError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_UPDATE_USER_MEDIA_BEGIN correctly', () => {
    const prevState = { updateUserMediaPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_UPDATE_USER_MEDIA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateUserMediaPending).toBe(true);
  });

  it('handles action type COMMON_UPDATE_USER_MEDIA_SUCCESS correctly', () => {
    const prevState = { updateUserMediaPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_UPDATE_USER_MEDIA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateUserMediaPending).toBe(false);
  });

  it('handles action type COMMON_UPDATE_USER_MEDIA_FAILURE correctly', () => {
    const prevState = { updateUserMediaPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_UPDATE_USER_MEDIA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateUserMediaPending).toBe(false);
    expect(state.updateUserMediaError).toEqual(expect.anything());
  });

  it('handles action type COMMON_UPDATE_USER_MEDIA_DISMISS_ERROR correctly', () => {
    const prevState = { updateUserMediaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_UPDATE_USER_MEDIA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateUserMediaError).toBe(null);
  });
});

