import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PROFILE_COMMENT_POST_BEGIN,
  PROFILE_COMMENT_POST_SUCCESS,
  PROFILE_COMMENT_POST_FAILURE,
  PROFILE_COMMENT_POST_DISMISS_ERROR,
} from '../../../../src/features/profile/redux/constants';

import {
  commentPost,
  dismissCommentPostError,
  reducer,
} from '../../../../src/features/profile/redux/commentPost';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('profile/redux/commentPost', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when commentPost succeeds', () => {
    const store = mockStore({});

    return store.dispatch(commentPost())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PROFILE_COMMENT_POST_BEGIN);
        expect(actions[1]).toHaveProperty('type', PROFILE_COMMENT_POST_SUCCESS);
      });
  });

  it('dispatches failure action when commentPost fails', () => {
    const store = mockStore({});

    return store.dispatch(commentPost({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PROFILE_COMMENT_POST_BEGIN);
        expect(actions[1]).toHaveProperty('type', PROFILE_COMMENT_POST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCommentPostError', () => {
    const expectedAction = {
      type: PROFILE_COMMENT_POST_DISMISS_ERROR,
    };
    expect(dismissCommentPostError()).toEqual(expectedAction);
  });

  it('handles action type PROFILE_COMMENT_POST_BEGIN correctly', () => {
    const prevState = { commentPostPending: false };
    const state = reducer(
      prevState,
      { type: PROFILE_COMMENT_POST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.commentPostPending).toBe(true);
  });

  it('handles action type PROFILE_COMMENT_POST_SUCCESS correctly', () => {
    const prevState = { commentPostPending: true };
    const state = reducer(
      prevState,
      { type: PROFILE_COMMENT_POST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.commentPostPending).toBe(false);
  });

  it('handles action type PROFILE_COMMENT_POST_FAILURE correctly', () => {
    const prevState = { commentPostPending: true };
    const state = reducer(
      prevState,
      { type: PROFILE_COMMENT_POST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.commentPostPending).toBe(false);
    expect(state.commentPostError).toEqual(expect.anything());
  });

  it('handles action type PROFILE_COMMENT_POST_DISMISS_ERROR correctly', () => {
    const prevState = { commentPostError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PROFILE_COMMENT_POST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.commentPostError).toBe(null);
  });
});

