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

export interface IResponse {
  result: string | false;
  code: number;
}

export interface IPostData {
  endpointUrl: string;
  sdlUrl: string;
  headers: IHeaders[];
  query: string;
  variables: object | string;
}

export interface IStateMain {
  data: string[];
  endpointUrlInput: string;
  sdlUrlInput: string;
  headersKeys: string;
  queryInput: string;
  variablesInput: string;
  searchResults: IResponse;
  error: string;
}

export interface IState {
  main: IStateMain;
}

export interface IHistoryData {
  name: string;
  data: IPostData;
  index: number;
  url: string;
  clientName: string;
}

export interface IResults {
  headers: IHeaders[];
  query: string;
  endpointUrl: string;
  variables: string;
}

export interface mockHistoryArrayElement {
  url: string;
  client: string;
  sdlUrl: string;
}
