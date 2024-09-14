import restfullReducer, { RequestHistoryItem } from './restfullReducer';

describe('restfullReducer', () => {
  const initialState = {
    data: null,
    history: [] as RequestHistoryItem[],
  };

  it('should return the initial state when no action is passed', () => {
    const result = restfullReducer(undefined, { type: '', payload: { type: '', payload: null } });
    expect(result).toEqual(initialState);
  });

  it('should update data when action type is UPDATE_INPUT', () => {
    const action = {
      type: 'UPDATE_INPUT',
      payload: { type: '', payload: { method: 'GET', url: '/api', body: '', headers: {} } },
    };
    const expectedState = { ...initialState, data: action.payload };

    const result = restfullReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should add a new item to history when action type is ADD_TO_HISTORY', () => {
    const historyItem = {
      method: 'POST',
      url: '/api/resource',
      body: '',
      headers: { 'Content-Type': 'application/json' },
    };
    const action = { type: 'ADD_TO_HISTORY', payload: historyItem };
    const expectedState = { ...initialState, history: [historyItem] };

    const result = restfullReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  //   it('should add multiple items to history when action type is ADD_TO_HISTORY', () => {
  //     const historyItem1 = { method: 'GET', url: '/api/resource1', body: '', headers: {} };
  //     const historyItem2 = { method: 'POST', url: '/api/resource2', body: '{"key":"value"}', headers: { 'Content-Type': 'application/json' } };

  //     let state = restfullReducer(initialState, { type: 'ADD_TO_HISTORY', payload: historyItem1 });
  //     state = restfullReducer(state, { type: 'ADD_TO_HISTORY', payload: historyItem2 });

  //     const expectedState = { ...initialState, history: [historyItem1, historyItem2] };
  //     expect(state).toEqual(expectedState);
  //   });

  it('should clear history when action type is CLEAR_HISTORY', () => {
    const historyItem = { method: 'GET', url: '/api/resource', body: '', headers: {} };
    const stateWithHistory = { ...initialState, history: [historyItem] };
    const action = { type: 'CLEAR_HISTORY', payload: null };

    const result = restfullReducer(stateWithHistory, action);
    expect(result.history).toEqual([]);
  });

  it('should not mutate the original state', () => {
    const action = { type: 'UPDATE_INPUT', payload: { method: 'GET', url: '/api', body: '', headers: {} } };
    const result = restfullReducer(initialState, action);
    expect(result).not.toBe(initialState);
  });

  it('should handle unknown action types gracefully', () => {
    const action = { type: 'UNKNOWN_ACTION', payload: null };
    const result = restfullReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});
