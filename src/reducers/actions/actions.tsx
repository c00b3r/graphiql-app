export const action = (action: number) => {
  return async (dispatch: (arg0: { type: string; payload?: number }) => void) => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: action,
    });
  };
};
