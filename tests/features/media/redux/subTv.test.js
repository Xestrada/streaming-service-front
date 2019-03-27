import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MEDIA_SUB_TV_BEGIN,
  MEDIA_SUB_TV_SUCCESS,
  MEDIA_SUB_TV_FAILURE,
  MEDIA_SUB_TV_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
  subTv,
  dismissSubTvError,
  reducer,
} from '../../../../src/features/media/redux/subTv';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('media/redux/subTv', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when subTv succeeds', () => {
    const store = mockStore({});

    return store.dispatch(subTv())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_SUB_TV_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_SUB_TV_SUCCESS);
      });
  });

  it('dispatches failure action when subTv fails', () => {
    const store = mockStore({});

    return store.dispatch(subTv({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_SUB_TV_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_SUB_TV_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSubTvError', () => {
    const expectedAction = {
      type: MEDIA_SUB_TV_DISMISS_ERROR,
    };
    expect(dismissSubTvError()).toEqual(expectedAction);
  });

  it('handles action type MEDIA_SUB_TV_BEGIN correctly', () => {
    const prevState = { subTvPending: false };
    const state = reducer(
      prevState,
      { type: MEDIA_SUB_TV_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.subTvPending).toBe(true);
  });

  it('handles action type MEDIA_SUB_TV_SUCCESS correctly', () => {
    const prevState = { subTvPending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_SUB_TV_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.subTvPending).toBe(false);
  });

  it('handles action type MEDIA_SUB_TV_FAILURE correctly', () => {
    const prevState = { subTvPending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_SUB_TV_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.subTvPending).toBe(false);
    expect(state.subTvError).toEqual(expect.anything());
  });

  it('handles action type MEDIA_SUB_TV_DISMISS_ERROR correctly', () => {
    const prevState = { subTvError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MEDIA_SUB_TV_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.subTvError).toBe(null);
  });
});

