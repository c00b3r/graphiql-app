'use client';
import { useEffect } from 'react';
import { mockQueryPoke, mockQuerySwapiNetlify } from '../../mocks/query';
import { makeNewUrl, urlConverter } from '@/methods/graphql/urlConverter';
import { mockHeadersPoke, mockHeadersSwapi } from '@/mocks/headers';
import { mockVariablesPoke } from '@/mocks/variables';
import { mockEndpointUrlPoke, mockEndpointUrlSwapiNetlify } from '@/mocks/urls';
import { Button } from '@mui/material';
import { IHeaders, IState } from './interfaces';
import ResponseGQL from '@/components/graphql/ResponseGQL';
import SDLUrlInput from '@/components/graphql/SdlUrl';
import EndpointUrlInput from '@/components/graphql/EndpointUrl';
import HeadersBlock from '@/components/graphql/HeadersBlock';
import GqlQueryInput from '@/components/graphql/GqlQueryInput';
import VariablesBlock from '@/components/graphql/VariablesGQL';
import DocumentationGQL from '@/components/graphql/Documentation';
import HistoryModule from '@/components/graphql/History';
import { saveResponse, updateAllDataWhenPageLoads } from '@/reducers/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { gql, request } from 'graphql-request';
import { AppDispatch } from '@/reducers/root/rootReduces';
import './page.css';

export default function GraphQL() {
  const dispatch = useDispatch<AppDispatch>();
  const endpointUrl = useSelector((state: IState) => state.main.endpointUrlInput);
  const headers = useSelector((state: IState) => state.main.headersKeys);
  const query = useSelector((state: IState) => state.main.queryInput);
  const variables = useSelector((state: IState) => state.main.variablesInput);
  const openHistoryPanel = useSelector((state: IState) => state.main.openHistoryPanel);

  useEffect(() => {
    dispatch(saveResponse(false, 0));
  });
  // let checkDoubleSave = 0;
  useEffect(() => {
    //
    //   // window.history.pushState(null, '', '123'); при онфокус делать или это или переход
    //   return () => {
    //     checkDoubleSave -= 1;
    //     if (checkDoubleSave !== -2) {
    //       const currentUrl = window.location.href;
    //       const partialData: IResults | boolean = dataFromUrl(currentUrl, false);
    //       const submitData: IPostData = {
    //         endpointUrl: '',
    //         sdlUrl: '',
    //         headers: [],
    //         query: '',
    //         variables: '',
    //       };
    //       if (partialData) {
    //         submitData.headers = partialData.headers;
    //         if (partialData.query !== '') {
    //           submitData.query = partialData.query;
    //         }
    //         submitData.endpointUrl = partialData.endpointUrl;
    //         submitData.variables = partialData.variables;
    //         submitData.sdlUrl = `${partialData.endpointUrl}?sdl`;
    //         // handleSubmit(
    //         //   submitData.endpointUrl,
    //         //   submitData.sdlUrl,
    //         //   submitData.headers,
    //         //   submitData.query,
    //         //   submitData.variables
    //         // );
    //       }
    //     }
    //   };
  }, []);

  const saveHistoryTo = (url: string) => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('history_gql');
      if (savedState) {
        try {
          const historyArray = JSON.parse(savedState);
          const mergedArray = [url].concat(historyArray);
          localStorage.setItem('history_gql', JSON.stringify(mergedArray));
        } catch {
          console.error('invalid data in local storage');
        }
      } else {
        localStorage.setItem('history_gql', JSON.stringify([url]));
      }
    }
  };

  const handleSubmitInput = async () => {
    handleSubmit();
  };

  const handleSubmitPoke = async () => {
    const currentUrl = window.location.href;
    const convertedDataToUrl = urlConverter(mockEndpointUrlPoke, mockHeadersPoke, mockQueryPoke, mockVariablesPoke);
    const newUrl = makeNewUrl(currentUrl, convertedDataToUrl);
    window.history.pushState({}, '', newUrl);
    dispatch(updateAllDataWhenPageLoads(newUrl));
  };

  const handleSubmitSwapi = async () => {
    const currentUrl = window.location.href;
    const convertedDataToUrl = urlConverter(mockEndpointUrlSwapiNetlify, mockHeadersSwapi, mockQuerySwapiNetlify, '');
    const newUrl = makeNewUrl(currentUrl, convertedDataToUrl);
    window.history.pushState({}, '', newUrl);
    dispatch(updateAllDataWhenPageLoads(newUrl));
  };

  // const showErrors = (err: unknown) => {
  //   const IError = err as IErrors;
  //   const statusCode = IError.response?.status || 500;
  //   const errorMessage = IError.response?.errors || IError.message;
  //    dispatch(saveErrorResponse(JSON.stringify(errorMessage), statusCode))
  // };

  const handleSubmit = async () => {
    let variablesSubmit: string | object = variables === '' || Object.keys(variables).length === 0 ? '{}' : variables;
    try {
      if (typeof variablesSubmit !== 'object') {
        const parsedVariables: object = JSON.parse(variablesSubmit);
        variablesSubmit = parsedVariables;
      }
      try {
        const queryTransformed = gql`
          ${query}
        `;
        try {
          const checkedHeaders: IHeaders[] = JSON.parse(headers);
          const headersTransformed = Object.fromEntries(checkedHeaders.map((h) => [h.key, h.value]));
          const body = await request(endpointUrl, queryTransformed, variablesSubmit, headersTransformed);
          dispatch(saveResponse(JSON.stringify(body), 200));
          const currentUrl = window.location.href;
          saveHistoryTo(currentUrl);
          // setDocumentationVisible(true);
          // setDocumentation('');
          // dispatch(saveHistoryData(currentUrl));
        } catch (err) {
          console.log('err1', err);
          // showErrors(err); // dispatch errors / bad headers Поместить код во все кэтчи
        }
      } catch (err) {
        console.log('err2', err);
        // showErrors(err); // dispatch errors
      }
    } catch (err) {
      console.log('err3', err);
      // showErrors(err); // dispatch errors
    }
  };

  return (
    // <div className={openHistoryPanel ? 'graphiql-overflow' : ''}>
    <div className="graphql_page_wrapper">
      {openHistoryPanel && <HistoryModule></HistoryModule>}
      <div>
        <div className="graphiql-wrapper">
          <h2 className="h2">GraphiQL Client</h2>
          <EndpointUrlInput></EndpointUrlInput>
          <SDLUrlInput></SDLUrlInput>
          <HeadersBlock></HeadersBlock>
          <GqlQueryInput></GqlQueryInput>
          <VariablesBlock></VariablesBlock>
          <div>
            <Button onClick={handleSubmitInput}>Submit input</Button>
            <Button onClick={handleSubmitPoke}>Submit Poke</Button>
            <Button onClick={handleSubmitSwapi}>Submit Swapi</Button>
          </div>
        </div>
        <ResponseGQL></ResponseGQL>
        <DocumentationGQL></DocumentationGQL>
      </div>
    </div>
  );
}
