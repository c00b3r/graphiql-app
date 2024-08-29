/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useEffect, useState } from 'react';
import { gql, request } from 'graphql-request';
import JsonViewer from '@/methods/jsonViewer';
import gqlPrettier from 'graphql-prettier';
import {
  introspectQueryNamed,
  introspectQueryUnnamed,
  mockQueryPoke,
  mockQuerySwapiNetlify,
  // mockQuerySwapiNetlifyIntrospect,
} from '../../mocks/query';
import { dataFromUrl, urlConverter } from '@/methods/urlConverter';
import { useRouter } from 'next/navigation';
import HistoryModule from '@/components/history';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { useDispatch, useSelector } from 'react-redux';
import { saveHistoryData, toggleHistoryPanel, updateUrl } from '@/reducers/actions/actions';
import { mockHeadersPoke, mockHeadersSwapi } from '@/mocks/headers';
import { mockVariablesPoke } from '@/mocks/variables';
import { mockEndpointUrlPoke, mockEndpointUrlSwapiNetlify, mockSdlUrl } from '@/mocks/urls';
import { Input, Button } from '@mui/material';
// import { run } from 'spectaql'
import './page.css';
import { IHeaders, IState, IPostData, IErrors } from './interfaces';
import { IResults } from '@/methods/interfaces';

export default function GraphQL() {
  const [endpointUrl, setEndpointUrl] = useState('');
  const [sdlUrl, setSdlUrl] = useState('');
  const [headers, setHeaders] = useState<IHeaders[]>([{ key: '', value: '' }]);
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [response, setResponse] = useState<string | null | object | unknown>(null);
  const [documentation, setDocumentation] = useState<string | null | object | unknown>(null);
  const [documentationVisible, setDocumentationVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const openHistoryPanel = useSelector((state: IState) => state.main.openHistoryPanel);

  useEffect(() => {
    const currentUrl = window.location.href;
    const partialData: IResults | boolean = dataFromUrl(currentUrl, false);
    const submitData: IPostData = {
      endpointUrl: '',
      sdlUrl: '',
      headers: [],
      query: '',
      variables: '',
    };
    if (partialData) {
      setHeaders(partialData.headers);
      submitData.headers = partialData.headers;
      if (partialData.query !== '') {
        try {
          setQuery(partialData.query);
          submitData.query = partialData.query;
        } catch {
          // wrong query
        }
      }

      setEndpointUrl(partialData.endpointUrl);
      submitData.endpointUrl = partialData.endpointUrl;
      setVariables(partialData.variables);
      submitData.variables = partialData.variables;

      setSdlUrl(`${partialData.endpointUrl}?sdl`);
      submitData.sdlUrl = `${partialData.endpointUrl}?sdl`;

      handleSubmit(
        submitData.endpointUrl,
        submitData.sdlUrl,
        submitData.headers,
        submitData.query,
        submitData.variables
      );
    }
  }, []);

  const changeUrlOnBlur = async () => {
    const newUrl = urlConverter(endpointUrl, headers, query, variables);
    router.push(`/GRAPHQL/${newUrl}`);
  };

  const prettifyQuery = () => {
    setQuery(gqlPrettier(query));
  };

  const handleHeaderChange = (index: number, field: string, value: string) => {
    const newHeaders = [...headers];
    const keyValueFromArray = newHeaders[index];
    if (field === 'key') {
      keyValueFromArray.key = value;
    } else {
      keyValueFromArray.value = value;
    }
    setHeaders(newHeaders);
  };

  const toggleHistory = () => {
    dispatch(toggleHistoryPanel(!openHistoryPanel));
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleSubmitInput = async () => {
    handleSubmit();
  };

  const handleSubmitPoke = async () => {
    const newUrl = urlConverter(mockEndpointUrlPoke, mockHeadersPoke, mockQueryPoke, mockVariablesPoke);
    router.push(`/GRAPHQL/${newUrl}`);
    // endpoint, sdl, headers, query, variables
    // handleSubmit(mockEndpointUrlPoke, sdlUrl !== '' ? sdlUrl : `${mockEndpointUrlPoke}?sdl`, mockHeadersPoke, mockQueryPoke, mockVariablesPoke);
  };

  const handleSubmitSwapi = async () => {
    // endpoint, sdl, headers, query, variables
    // handleSubmit(mockEndpointUrlSwapiNetlify, sdlUrl !== '' ? sdlUrl : `${mockEndpointUrlSwapiNetlify}?sdl`, mockHeadersSwapi, mockQuerySwapiNetlify, {});
    const newUrl = urlConverter(mockEndpointUrlSwapiNetlify, mockHeadersSwapi, mockQuerySwapiNetlify, '');
    router.push(`/GRAPHQL/${newUrl}`);
  };

  const removeHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
  };

  const showErrors = (err: unknown) => {
    const IError = err as IErrors;
    const statusCode = IError.response?.status || 500;
    const errorMessage = IError.response?.errors || IError.message;
    setStatusCode(statusCode);
    setResponse(errorMessage);
    setDocumentationVisible(false);
  };

  const handleSubmit = async (
    mockEndpointUrl?: string,
    mockSdlUrl?: string,
    mockHeaders?: IHeaders[],
    mockQuery?: string,
    mockVariables?: string | object
  ) => {
    const endpointUrlSubmit = mockEndpointUrl ? mockEndpointUrl : endpointUrl;
    const sdlUrlSubmit = mockSdlUrl ? mockSdlUrl : sdlUrl;
    const headersSubmit = mockHeaders ? mockHeaders : headers;
    const querySubmit = mockQuery ? mockQuery : query;
    const uncheckedVariables = mockVariables ? mockVariables : variables;
    let variablesSubmit: string | object =
      uncheckedVariables === '' || Object.keys(uncheckedVariables).length === 0 ? '{}' : uncheckedVariables;
    try {
      if (typeof variablesSubmit !== 'object') {
        const parsedVariables: object = JSON.parse(variablesSubmit);
        variablesSubmit = parsedVariables;
      }
      try {
        const queryTransformed = gql`
          ${querySubmit}
        `;

        const headersTransformed = Object.fromEntries(headersSubmit.map((h) => [h.key, h.value]));
        const body = await request(endpointUrlSubmit, queryTransformed, variablesSubmit, headersTransformed);
        // const introspectQuery =
        // mockQueryPoke.split(' ')[0].toLowerCase() === 'query' ? introspectQueryNamed : introspectQueryUnnamed;

        // const documentation = await request(sdlUrlSubmit, introspectQuery, {}, headersTransformed);
        // console.log('documentation', documentation.__schema)
        setResponse(body);
        setStatusCode(200);
        setSdlUrl(sdlUrlSubmit === '' ? `${endpointUrl}?sdl` : sdlUrlSubmit);
        setDocumentationVisible(true);
        // setDocumentation(documentation);

        // const newUrl = urlConverter(endpointUrl, headers, query, variables);
        // const savedUrl = (`/GRAPHQL/${newUrl}`);
        const currentUrl = window.location.href;
        dispatch(saveHistoryData(currentUrl));
        //
      } catch (err) {
        showErrors(err);
      }
    } catch (err) {
      showErrors(err);
    }
  };

  return (
    <div className={openHistoryPanel ? 'graphiql-overflow' : ''}>
      {openHistoryPanel && <HistoryModule></HistoryModule>}
      <div>
        <div className="graphiql-wrapper">
          <h2 className="h2">GraphiQL Client</h2>
          <div className="graphiql-input-wrapper">
            <h3 className="h3-width">Endpoint URL</h3>
            <Input
              type="text"
              value={endpointUrl}
              onChange={(e) => setEndpointUrl(e.target.value)}
              onBlur={changeUrlOnBlur}
            />
          </div>
          <div className="graphiql-input-wrapper">
            <h3 className="h3-width">SDL URL</h3>
            <Input type="text" value={sdlUrl} onChange={(e) => setSdlUrl(e.target.value)} onBlur={changeUrlOnBlur} />
          </div>
          <div className="headers-wrapper">
            <div className="graphiql-input-wrapper">
              <h3 className="h3-width">Headers</h3>
              <div>
                <Button onClick={addHeader}>Add Header</Button>
              </div>
            </div>
            {headers.map((header, index) => (
              <div className="headers-element" key={`header-${index}`}>
                <Input
                  type="text"
                  placeholder="Header Key"
                  value={header.key}
                  onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                  onBlur={changeUrlOnBlur}
                />
                <Input
                  type="text"
                  placeholder="Header Value"
                  value={header.value}
                  onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                  onBlur={changeUrlOnBlur}
                />
                <Button className={'header_button'} onClick={() => removeHeader(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <div className="query_wrapper">
            <h3 className="h3-width">Query</h3>{' '}
            <div>
              <Button onClick={prettifyQuery}>prettify</Button>
              <Button onClick={toggleHistory}>history</Button>
            </div>
          </div>
          <textarea
            className="textarea textarea-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={changeUrlOnBlur}
            rows={5}
          />
          <h3 className="h3-width">Variables</h3>
          <textarea
            className="textarea textarea-variables"
            value={variables}
            onChange={(e) => setVariables(e.target.value)}
            onBlur={changeUrlOnBlur}
            rows={5}
          />
          <div>
            <Button onClick={handleSubmitInput}>Submit input</Button>
            <Button onClick={handleSubmitPoke}>Submit Poke</Button>
            <Button onClick={handleSubmitSwapi}>Submit Swapi</Button>
          </div>
        </div>
        <div className="response-wrapper">
          <h2 className="h2">Response</h2>
          <div className={'response-data'}>
            <div>Status: {statusCode}</div>

            {statusCode === 200 && (
              <>
                <div>Body: </div>
                <div>
                  {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
                  {JsonViewer(response as object)}
                </div>
              </>
            )}
            {statusCode !== 200 && (
              <div>
                Body: <pre>{response as string}</pre>
              </div>
            )}
          </div>
        </div>
        {documentationVisible && (
          <div>
            <h2 className="h2">Documentation</h2>
            <div>
              <pre>{JSON.stringify(documentation, null, 2)}</pre>
              {/* {documentation as object} */}
            </div>
            {/* <p>{documentation as object}</p> */}
          </div>
        )}
      </div>
    </div>
  );
}
