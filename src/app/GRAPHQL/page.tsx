'use client';
import { useEffect } from 'react';
import { mockQueryPoke, mockQuerySwapiNetlify } from '../../mocks/query';
import { urlConverter } from '@/methods/graphql/urlConverter';
import { useRouter } from 'next/navigation';
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
// import HistoryModule from '@/components/graphql/History';
import { saveHistoryData, saveResponse } from '@/reducers/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { gql, request } from 'graphql-request';
import { AppDispatch } from '@/reducers/root/rootReduces';
import './page.css';

export default function GraphQL() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const endpointUrl = useSelector((state: IState) => state.main.endpointUrlInput);
  const headers = useSelector((state: IState) => state.main.headersKeys);
  const query = useSelector((state: IState) => state.main.queryInput);
  const variables = useSelector((state: IState) => state.main.variablesInput);

  useEffect(() => {
    dispatch(saveResponse(false, 0));
  });
  // let checkDoubleSave = 0;
  // useEffect(() => {
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
  // }, []);

  const handleSubmitInput = async () => {
    handleSubmit();
  };

  const handleSubmitPoke = async () => {
    const newUrl = urlConverter(mockEndpointUrlPoke, mockHeadersPoke, mockQueryPoke, mockVariablesPoke);
    router.push(`/GRAPHQL/${newUrl}`);
  };

  const handleSubmitSwapi = async () => {
    const newUrl = urlConverter(mockEndpointUrlSwapiNetlify, mockHeadersSwapi, mockQuerySwapiNetlify, '');
    router.push(`/GRAPHQL/${newUrl}`);
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
          // setResponse(body);
          // setStatusCode(200); // Заменить на dispatch
          // setDocumentationVisible(true);
          // setDocumentation('');
          const currentUrl = window.location.href;
          dispatch(saveHistoryData(currentUrl));
        } catch {
          // showErrors(err); // dispatch errors / bad headers Поместить код во все кэтчи
        }
      } catch {
        // showErrors(err); // dispatch errors
      }
    } catch {
      // showErrors(err); // dispatch errors
    }
  };

  return (
    // <div className={openHistoryPanel ? 'graphiql-overflow' : ''}>
    <div>
      {/* {openHistoryPanel && <HistoryModule></HistoryModule>} */}
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
