/* eslint-disable @typescript-eslint/no-explicit-any */
const initialState = {
  data: null,
};

const mainReducer = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case 'UPDATE_INPUT': {
      return { ...state, data: action.payload };
    }

    default:
      return state;
  }
};

export default mainReducer;
