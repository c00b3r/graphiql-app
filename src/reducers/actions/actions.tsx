import { IHeaders } from '@/app/GRAPHQL/interfaces';

export const saveHistoryData = (action: string) => {
  return async (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'SAVE_HISTORY_DATA',
      payload: action,
    });
  };
};

export const toggleHistoryPanel = (action: boolean) => {
  return async (dispatch: (arg0: { type: string; payload: boolean }) => void) => {
    dispatch({
      type: 'TOGGLE_HISTORY_PANEL',
      payload: action,
    });
  };
};

export const updateUrl = (action: [string, IHeaders[], string, string]) => {
  return async (dispatch: (arg0: { type: string; payload: [string, IHeaders[], string, string] }) => void) => {
    dispatch({
      type: 'UPDATE_URL',
      payload: action,
    });
  };
};
