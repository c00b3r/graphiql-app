import { IHeaders, IPostData, IStateMain } from '@/app/GRAPHQL/interfaces';
import { dataFromUrl } from '@/methods/graphql/urlConverter';
import { IResults } from '@/methods/interfaces';

const initialState: IStateMain = {
  data: [],
  endpointUrlInput: '',
  sdlUrlInput: '',
  headersKeys: '',
  queryInput: '',
  variablesInput: '',
  openHistoryPanel: false,
  searchResults: {
    result: false,
    code: 0,
  },
};

const mainReducer = (
  state = initialState,
  action: { type: string; payload: boolean | string | string[] | IHeaders[] }
) => {
  switch (action.type) {
    case 'UPDATE_HEADERS': {
      const newHeaders = action.payload as IHeaders[];
      return {
        ...state,
        headersKeys: JSON.stringify([...newHeaders]),
      };
    }

    case 'SAVE_HISTORY_DATA': {
      const mergedArray = [action.payload].concat(state.data);
      return { ...state, data: mergedArray };
    }
    case 'TOGGLE_HISTORY_PANEL': {
      return { ...state, openHistoryPanel: action.payload };
    }
    case 'UPDATE_ENDPOINT': {
      return { ...state, endpointUrlInput: action.payload };
    }
    case 'UPDATE_SDL': {
      return { ...state, sdlUrlInput: action.payload };
    }
    case 'UPDATE_QUERY': {
      return { ...state, queryInput: action.payload };
    }

    case 'UPDATE_VARIABLES': {
      return { ...state, variablesInput: action.payload };
    }
    case 'SAVE_RESPONSE': {
      return { ...state, searchResults: action.payload };
    }
    case 'UPDATE_ALL_DATA_FROM_URL': {
      console.log('UPDATE_ALL_DATA_FROM_URL');
      const partialData: IResults | boolean = dataFromUrl(action.payload as string, false);
      const submitData: IPostData = {
        endpointUrl: '',
        sdlUrl: '',
        headers: [],
        query: '',
        variables: '',
      };
      if (partialData) {
        submitData.headers = partialData.headers;
        if (partialData.query !== '') {
          submitData.query = partialData.query;
        }
        submitData.endpointUrl = partialData.endpointUrl;
        submitData.variables = partialData.variables;
        submitData.sdlUrl = `${partialData.endpointUrl}?sdl`;
      }
      return {
        ...state,
        endpointUrlInput: submitData.endpointUrl,
        sdlUrlInput: state.sdlUrlInput === '' ? `${state.endpointUrlInput}?sdl` : state.sdlUrlInput,
        queryInput: submitData.query,
        headersKeys: JSON.stringify([...submitData.headers]),
        variablesInput: submitData.variables,
      };
    }

    default:
      return state;
  }
};

export default mainReducer;
