const initialState = {
  data: [],
  openHistoryPanel: false,
};

const mainReducer = (state = initialState, action: { type: string; payload: boolean | string }) => {
  switch (action.type) {
    case 'SAVE_HISTORY_DATA': {
      const mergedArray = [action.payload].concat(state.data);
      return { ...state, data: mergedArray };
    }
    case 'TOGGLE_HISTORY_PANEL': {
      return { ...state, openHistoryPanel: action.payload };
    }
    default:
      return state;
  }
};

export default mainReducer;
