export interface IErrors {
  response: {
    status: number;
    errors: string;
  };
  message: string;
}

export interface IHeaders {
  key: string;
  value: string;
}

export interface IPostData {
  endpointUrl: string;
  sdlUrl: string;
  headers: IHeaders[];
  query: string;
  variables: object | string;
}

export interface IStateMain {
  data: [];
  openHistoryPanel: boolean;
}

export interface IState {
  main: IStateMain;
}
