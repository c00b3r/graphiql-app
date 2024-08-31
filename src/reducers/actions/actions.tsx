import { IHeaders, IResponse } from '@/app/GRAPHQL/interfaces';

export const saveHistoryData = (action: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'SAVE_HISTORY_DATA',
      payload: action,
    });
  };
};

export const toggleHistoryPanel = (action: boolean) => {
  return (dispatch: (arg0: { type: string; payload: boolean }) => void) => {
    dispatch({
      type: 'TOGGLE_HISTORY_PANEL',
      payload: action,
    });
  };
};

export const updateEndpoint = (action: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'UPDATE_ENDPOINT',
      payload: action,
    });
  };
};
export const updateSDL = (action: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'UPDATE_SDL',
      payload: action,
    });
  };
};
export const updateQuery = (action: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'UPDATE_QUERY',
      payload: action,
    });
  };
};
export const updateHeaders = (action: IHeaders[]) => {
  return (dispatch: (arg0: { type: string; payload: IHeaders[] }) => void) => {
    dispatch({
      type: 'UPDATE_HEADERS',
      payload: action,
    });
  };
};

export const updateVariables = (action: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'UPDATE_VARIABLES',
      payload: action,
    });
  };
};

export const updateAllDataWhenPageLoads = (action: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'UPDATE_ALL_DATA_FROM_URL',
      payload: action,
    });
  };
};

export const saveResponse = (result: string | false, code: number) => {
  return (dispatch: (arg0: { type: string; payload: IResponse }) => void) => {
    dispatch({
      type: 'SAVE_RESPONSE',
      payload: { result, code },
    });
  };
};
