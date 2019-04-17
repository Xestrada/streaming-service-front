import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PROFILE_POST_TIMELINE_BEGIN,
  PROFILE_POST_TIMELINE_SUCCESS,
  PROFILE_POST_TIMELINE_FAILURE,
  PROFILE_POST_TIMELINE_DISMISS_ERROR,
} from '../../../../src/features/profile/redux/constants';

import {
  postTimeline,
  dismissPostTimelineError,
  reducer,
} from '../../../../src/features/profile/redux/postTimeline';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('profile/redux/postTimeline', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when postTimeline succeeds', () => {
    const store = mockStore({});

    return store.dispatch(postTimeline())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PROFILE_POST_TIMELINE_BEGIN);
        expect(actions[1]).toHaveProperty('type', PROFILE_POST_TIMELINE_SUCCESS);
      });
  });

  it('dispatches failure action when postTimeline fails', () => {
    const store = mockStore({});

    return store.dispatch(postTimeline({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PROFILE_POST_TIMELINE_BEGIN);
        expect(actions[1]).toHaveProperty('type', PROFILE_POST_TIMELINE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissPostTimelineError', () => {
    const expectedAction = {
      type: PROFILE_POST_TIMELINE_DISMISS_ERROR,
    };
    expect(dismissPostTimelineError()).toEqual(expectedAction);
  });

  it('handles action type PROFILE_POST_TIMELINE_BEGIN correctly', () => {
    const prevState = { postTimelinePending: false };
    const state = reducer(
      prevState,
      { type: PROFILE_POST_TIMELINE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postTimelinePending).toBe(true);
  });

  it('handles action type PROFILE_POST_TIMELINE_SUCCESS correctly', () => {
    const prevState = { postTimelinePending: true };
    const state = reducer(
      prevState,
      { type: PROFILE_POST_TIMELINE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postTimelinePending).toBe(false);
  });

  it('handles action type PROFILE_POST_TIMELINE_FAILURE correctly', () => {
    const prevState = { postTimelinePending: true };
    const state = reducer(
      prevState,
      { type: PROFILE_POST_TIMELINE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postTimelinePending).toBe(false);
    expect(state.postTimelineError).toEqual(expect.anything());
  });

  it('handles action type PROFILE_POST_TIMELINE_DISMISS_ERROR correctly', () => {
    const prevState = { postTimelineError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PROFILE_POST_TIMELINE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.postTimelineError).toBe(null);
  });
});

