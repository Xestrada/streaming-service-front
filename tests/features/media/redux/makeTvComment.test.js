import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MEDIA_MAKE_TV_COMMENT_BEGIN,
  MEDIA_MAKE_TV_COMMENT_SUCCESS,
  MEDIA_MAKE_TV_COMMENT_FAILURE,
  MEDIA_MAKE_TV_COMMENT_DISMISS_ERROR,
} from '../../../../src/features/media/redux/constants';

import {
  makeTvComment,
  dismissMakeTvCommentError,
  reducer,
} from '../../../../src/features/media/redux/makeTvComment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('media/redux/makeTvComment', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when makeTvComment succeeds', () => {
    const store = mockStore({});

    return store.dispatch(makeTvComment())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_MAKE_TV_COMMENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_MAKE_TV_COMMENT_SUCCESS);
      });
  });

  it('dispatches failure action when makeTvComment fails', () => {
    const store = mockStore({});

    return store.dispatch(makeTvComment({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEDIA_MAKE_TV_COMMENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEDIA_MAKE_TV_COMMENT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissMakeTvCommentError', () => {
    const expectedAction = {
      type: MEDIA_MAKE_TV_COMMENT_DISMISS_ERROR,
    };
    expect(dismissMakeTvCommentError()).toEqual(expectedAction);
  });

  it('handles action type MEDIA_MAKE_TV_COMMENT_BEGIN correctly', () => {
    const prevState = { makeTvCommentPending: false };
    const state = reducer(
      prevState,
      { type: MEDIA_MAKE_TV_COMMENT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.makeTvCommentPending).toBe(true);
  });

  it('handles action type MEDIA_MAKE_TV_COMMENT_SUCCESS correctly', () => {
    const prevState = { makeTvCommentPending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_MAKE_TV_COMMENT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.makeTvCommentPending).toBe(false);
  });

  it('handles action type MEDIA_MAKE_TV_COMMENT_FAILURE correctly', () => {
    const prevState = { makeTvCommentPending: true };
    const state = reducer(
      prevState,
      { type: MEDIA_MAKE_TV_COMMENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.makeTvCommentPending).toBe(false);
    expect(state.makeTvCommentError).toEqual(expect.anything());
  });

  it('handles action type MEDIA_MAKE_TV_COMMENT_DISMISS_ERROR correctly', () => {
    const prevState = { makeTvCommentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MEDIA_MAKE_TV_COMMENT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.makeTvCommentError).toBe(null);
  });
});

