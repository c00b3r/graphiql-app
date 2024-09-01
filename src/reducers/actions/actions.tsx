export const action = (action: number) => {
  return async (dispatch: (arg0: { type: string; payload?: number }) => void) => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: action,
    });
  };
};

export const addToHistory = (request: {
  method: string;
  url: string;
  body: string;
  headers: { [key: string]: string };
}) => ({
  type: 'ADD_TO_HISTORY',
  payload: request,
});
